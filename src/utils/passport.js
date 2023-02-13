import passport from "passport";
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt, { genSaltSync } from "bcrypt";
import { User } from "../models/userModel.js";
import config from '../../config.js';

passport.use('registro', new LocalStrategy({
    usernameField: "email",
}, async (username, password, callback) => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.options);
        const userReg = await User.findOne({ username: username });
        if (userReg.length > 0) { return callback() };
        const passHash = bcrypt.hashSync(password, genSaltSync(10));
        const newUser = { username, password: passHash, nombre: "", telefono: "" }
        await User.save(newUser)
        callback(null, newUser)
    }
    catch (err) {
        console.log(err)
    }
}))

passport.use('auth', new LocalStrategy(
    {
        usernameField: "email",
        session: false
    }, async (username, password, callback) => {
        await mongoose.connect(config.mongodb.uri, config.mongodb.options);
        const userLogArray = await User.findOne({ username: username });
        if (!userLogArray || !bcrypt.compareSync(password, String(userLogArray.password))) return callback();
        callback(null, userLogArray);
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

export default passport;
