import { Schema, model } from "mongoose";

const carritoCollection = 'carrito';
const carritoSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    items: {
        type: Array,
    },
    direccionEntrega: {
        type: String,
        require: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export const Carrito = model(carritoCollection, carritoSchema);