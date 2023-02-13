import {
    carritosDao as carritosApi,
    productosDao as productosApi
} from '../dao/index.js';
import { createCarrito, deleteCarrito, deleteProductFromCart, getCarritoById, updateCarritoById } from '../services/carritoServices.js';

export const crearCarrito = async (req, res) => {
    try {
        await createCarrito(req, res);
    } catch (error) {
        res.status(400).json({ error })
    }
};

export const borrarCarrito = async (req, res) => {
    try {
        await deleteCarrito(req, res);
    } catch (error) {
        res.status(400).json({ error })
    }
};

export const buscarPorIdCarrito = async (req, res) => {
    try {
        await getCarritoById(req, res);
    } catch (error) {
        res.status(400).json({ error })
    }
};

export const actualizarCarrito = async (req, res) => {
    try {
        await updateCarritoById(req, res);
    } catch (error) {
        res.status(400).json({ error })
    }
};

export const borrarProductoCarritoPorId = async (req, res) => {
    try {
        await deleteProductFromCart(req, res);
    } catch (error) {
        res.status(400).json({ error })
    }
};
