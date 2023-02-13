import { Schema, model } from "mongoose";

const chatCollection = 'mensajes';
const chatSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }, 
    isAdmin: {
        type: Boolean,
        default: false
    }
})

export const Chat = model(chatCollection, chatSchema);