import { Router } from "express";
import { signup } from '../controllers/userController.js'

export const registroRouter = Router();
registroRouter.get('/registro', (req, res) => res.render('register'));
registroRouter.post('/registro', signup);
registroRouter.get('/error-registro', (req, res) => res.render('failregister'));
