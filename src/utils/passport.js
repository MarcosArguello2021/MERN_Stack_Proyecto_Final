import passport from "passport";
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import config from '../../config.js';

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
