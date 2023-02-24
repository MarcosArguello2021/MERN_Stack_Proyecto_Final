import { chatDao } from '../dao/index.js';
import { User } from "../models/userModel.js";
import { logger } from './logger.js';
import mongoose from 'mongoose';
import config from '../../config.js';

let user = await User.find({});

export default async (io) => {
  await mongoose.connect(config.mongodb.uri, config.mongodb.options)
  io.on('connection', async (socket) => {
    logger.info('Usuario conectado')
    let chatGeneral = await chatDao.getAll();
    let chat = await isAdminAchat(chatGeneral);
    socket.emit('lista_chat', chat);

    socket.on('cliente_nuevo_mensaje_chat', async data => {
      await chatDao.save(data)
      let chatGeneral = await chatDao.getAll();
      let chat = await isAdminAchat(chatGeneral);
      io.sockets.emit('lista_chat', chat)
    })
  })
};

const isAdminAchat = (chat) => {
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
  return chat;
}