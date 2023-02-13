import { Schema, model } from "mongoose";

const productoCollection = 'producto';
const productSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    urlImagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export const Product = model(productoCollection, productSchema);