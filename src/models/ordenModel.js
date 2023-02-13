import { Schema, model } from "mongoose";

const ordenCollection = 'ordenes';
const ordenSchema = new Schema({
    items: {
        type: Array,
        required: true
    },
    ordenNumero: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'generada'
    },
    email: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Orden = model(ordenCollection, ordenSchema);