import mongoose from 'mongoose'
import config from '../../config.js'
import {registro, desloguear, loguearse} from '../services/userServices.js';

await mongoose.connect(config.mongodb.uri, config.mongodb.options)

export const signup = async (req, res) => {
    try {
        await registro(req, res);
    } catch (error) {
        res.status(404).json({ error })
    }
};

export const signin = async (req, res) =>{
    try {
        await loguearse(req, res);
    } catch (error) {
        res.status(404).json({ error })
    }
}

export const logout = async (req, res, next)=> {
    try {
        await desloguear(req, res);
    } catch (error) {
        return res.render("failregister", { status:"404", mensaje: 'Error al desloguearse'} )
    }
}

export const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/login');
    }
}