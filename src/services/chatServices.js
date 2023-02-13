import mongoose from 'mongoose'
import config from '../../config.js'
import { chatDao } from '../dao/index.js';
import { ChatDto } from '../dto/ChatDto.js';
import transformarEnArrayDeDto from '../utils/arrayToDto.js';

export const chatByID = async (req, res) => {
    const { email } = req.params
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.options)
        const chats = await chatDao.getAll();
        const chatByID = chats.filter((data => data.email === email));
        const mensajesDto = transformarEnArrayDeDto(chatByID, ChatDto)
        let hayMensajes = false
        if (chatByID) hayMensajes=true
        res.render('chatByEmail', { email, mensajesDto, hayMensajes })
    } catch (error) {
        throw new Error('Error al mostrar chat por email', error)
    }
};
