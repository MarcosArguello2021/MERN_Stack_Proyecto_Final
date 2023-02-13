import { Router } from "express";
import passport from "../utils/passport.js";
import {
    logout,
    signin
}
    from '../controllers/userController.js'

export const loginRouter = Router();
loginRouter.get('/', (req, res) => res.render('login'))
loginRouter.post('/', passport.authenticate("auth",{session:false, failureRedirect:"/error-login"}), signin);
loginRouter.get('/logout', logout);
loginRouter.get('/error-login', (req, res) => res.render('faillogin'))
