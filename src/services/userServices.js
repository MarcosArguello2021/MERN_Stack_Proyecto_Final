import config from '../../config.js';
import mongoose from 'mongoose';
import { User } from "../models/userModel.js";
import { mailRegistro } from "../utils/armarMail.js";
import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger.js';
const jwtSign = jwt.sign

await mongoose.connect(config.mongodb.uri, config.mongodb.options);

export const registro = async (req, res) => {
    await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    const { nombre, celular, username, password, password2, rol, direccion } = req.body
    const userFound = await User.findOne({ username: username })
    if (userFound || username == undefined || username == '') {
        return res.render("failregister", { status: "400", mensaje: "el usuario ya se encuentra registrado" })
    }
    if (!nombre || !celular || !username || !password || !password2 || !rol || !direccion)
        return res.render("failregister", { status: "400", mensaje: 'Falta completar algún campo' })
    if (password !== password2)
        return res.render("failregister", { status: "400", mensaje: 'Las contraseñas ingresadas no coinciden' })
    const newUser = new User({ nombre, celular, username, password, rol, direccion })
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save();
    await mailRegistro(newUser);
    return res.redirect("/")
};

export const loguearse = async (req, res) => {;
    const username = req.body.email;
    const user = await User.findOne({ username: username });
    const payload = await crearPayloadToken(user);
    const token = jwtSign(payload, config.jwt.secretKey, { expiresIn: config.jwt.expireToken });
    res
        .cookie("jwt", token, { httpOnly: true, secure: true, signed: true })
        .redirect("/api/productos")
};

export const desloguear = (req, res, next) => {
    res.cookie
    res.clearCookie("jwt")
    res.redirect("/")
};

export const crearPayloadToken = async (user) => {
    try {
        const { username, rol } = user;
        const payload = { sub: username, user: rol }
        return payload
    } catch (error) {
        logger.error(error.message, 'Error crearPayloadToken userService')
    }
};