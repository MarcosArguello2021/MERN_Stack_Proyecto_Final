import { Router } from "express";
import passport from "../utils/passport.js";
import {
    logout,
    signin,
    signup
}
    from '../controllers/userController.js'

export const userRouter = Router();
userRouter.get('/', (req, res) => res.render('login'));
userRouter.post('/', passport.authenticate("auth",{session:false, failureRedirect:"/error-login"}), signin);
userRouter.get('/logout', logout);
userRouter.get('/error-login', (req, res) => res.render('faillogin'));
userRouter.get('/error-auth', (req, res) => res.render('failauth'));
userRouter.get('/registro', (req, res) => res.render('register'));
userRouter.post('/registro', signup);
userRouter.get('/error-registro', (req, res) => res.render('failregister'));

