import { Router } from "express";
import { chatByID } from '../services/chatServices.js';
import { authJWT } from "../utils/jwtAuth.js";

export const chatRouter = Router()
//chatRouter.use(authJWT);
chatRouter.get('/chat', (req, res) => res.render('chat'));
chatRouter.get('/chat/:email', chatByID); //Recibe email para visualizar solamente los correos de ese usuario
