import mongoose from 'mongoose'
import config from '../../config.js'
import { createOrden, getOrdenes, getOrdenesById } from '../services/ordenServices.js';

await mongoose.connect(config.mongodb.uri, config.mongodb.options)

export const listarOrdenes = async (req, res) => {
    try {
        await getOrdenes(req, res);
    } catch (error) {
        res.status(404).json({ error })
    }
};

export const listarOrdenPorId = async (req, res) =>{
    try {
        await getOrdenesById(req, res);
    } catch (error) {
        res.status(404).json({ error })
    }
}

export const crearOrden = async (req, res) =>{
    try {
        await createOrden(req, res);
    } catch (error) {
        res.status(404).json({ error })
    }
}