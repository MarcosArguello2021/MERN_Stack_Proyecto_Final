import config from '../../config.js';
import { usuariosDao as usuariosApi } from '../dao/index.js';
import { mailRegistro } from "../utils/armarMail.js";
import { logger } from '../utils/logger.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const jwtSign = jwt.sign

export const registro = async (req, res) => {
    const { nombre, celular, username, password, password2, rol, direccion } = req.body
    const usuarios = await usuariosApi.getAll();
    try {
        if (usuarios) {
            let userFound = usuarios.find(user => user.username == username);
            if (userFound) {
                return res.render("failregister", { status: "400", mensaje: "el usuario ya se encuentra registrado" })
            } else {
                if (!nombre || !celular || !username || !password || !password2 || !rol || !direccion)
                    return res.render("failregister", { status: "400", mensaje: 'Falta completar algún campo' })
                if (password !== password2)
                    return res.render("failregister", { status: "400", mensaje: 'Las contraseñas ingresadas no coinciden' })
                const newUser = { nombre, celular, username, password, rol, direccion };
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                newUser.password = hashPassword
                await usuariosApi.save(newUser);
                await mailRegistro(newUser);
                return res.redirect("/")
            }
        }
    }
    catch (error) {
        res.status(400).json({ error: `Error al leer usuarios ${error}` })
    }
};

export const loguearse = async (req, res) => {
    const username = req.body.email;
    const usuarios = await usuariosApi.getAll();
    let user = usuarios.find(user => user.username == username);
    const payload = await crearPayloadToken(user);
    const token = jwtSign(payload, config.jwt.secretKey, { expiresIn: config.jwt.expireToken });
    logger.info("Token cliente para Postman: " + token);
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