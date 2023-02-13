import { chatDao } from '../dao/index.js';
import { User } from "../models/userModel.js";
import { logger } from './logger.js';
import mongoose from 'mongoose';
import config from '../../config.js';

export default async (io) => {
  io.on('connection', async (socket) => {
    logger.info('Usuario conectado')
    let chat = verificarChat;
    socket.emit('lista_chat', chat);

    socket.on('cliente_nuevo_mensaje_chat', async data => {
      await chatDao.save(data)
      let chat = verificarChat;
      io.sockets.emit('lista_chat', chat)
    })
  })
};

const verificarChat = async (req, res) => {
  await mongoose.connect(config.mongodb.uri, config.mongodb.options)
  let chat = await chatDao.getAll();
  let user = await User.find({});
  chat.forEach(mensaje => {
    user.forEach(user => {
      if (mensaje.email == user.username) {
        if (user.rol == 'admin') {
          mensaje.isAdmin = true;
        } else {
          mensaje.isAdmin = false;
        }
      }
    })
  })
}