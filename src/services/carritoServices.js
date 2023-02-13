import {
    carritosDao as carritosApi,
    productosDao as productosApi
}
    from '../dao/index.js';
import { User } from "../models/userModel.js";

export const createCarrito = async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        try {
            const user = await User.findOne({ username: id });
            if (user) {
                const info = await carritosApi.save({ products: [], email: user.username, direccionEntrega: user.direccion })
                res.send(info)
            } else {
                res.status(400).json({ error: `No existe un usuario con ese ID` })
            }
        } catch (error) {
            res.status(400).json({ error: `Error al intentar guardar el carrito - ${error}` })
        }
    } else {
        res.status(400).json({ error: 'Es necesario proporcionar un userId' })
    }
}

export const deleteCarrito = async (req, res) => {
    const id = req.params.id;
    try {
        const carrito = await carritosApi.getById(id);
        if (!carrito) {
            return res.status(400).json({ error: "Carrito no encontrado" });
        } else {
            await carritosApi.deleteById(id);
            res.status(200).json({ mensaje: 'Carrito borrado con exito' })
        }
    } catch (error) {
        res.status(400).json({ error: '-1, No se encontró el ID' })
    }
}

export const getCarritoById = async (req, res) => {
    const id = req.params.id;
    try {
        const carrito = await carritosApi.getById(id);
        res.send(carrito);
    } catch (error) {
        return res.status(400).json({ error: "Carrito no encontrado" });
    }
}

export const updateCarritoById = async (req, res) => {
    const id = req.params.id;
    const idProductos = req.params.idProductos;
    if (id && idProductos) {
        try {
            const carrito = await carritosApi.getById(id)
            const productosIndex = carrito[0].items.findIndex(prod => prod.producto._id == idProductos);
            if (productosIndex != -1) {
                carrito[0].items[productosIndex].cantidad++
                await carritosApi.putById(id, carrito[0])
                res.status(200).json({ messaje: 'Productos sumado al carrito' })

            } else {
                const producto = await productosApi.getById(idProductos);
                carrito[0].items.push({ cantidad: 1, producto: producto[0] })
                await carritosApi.putById(id, carrito[0])
                res.status(200).json({ messaje: 'Productos agregados al carrito' })
            }

        } catch (error) {
            res.status(400).json({ error: `No se pudo guardar el producto en el carrito - ${error}` })
        }
    } else {
        res.status(400).json({ error: 'Se necesita un ID de carrito y un ID de producto' })
    }
};

export const deleteProductFromCart = async (req, res) => {
    const { id, idProductos } = req.params;
    if (id, idProductos) {
        try {
            const carrito = await carritosApi.getById(id)
            const productosIndex = carrito[0].items.findIndex(prod => prod.producto._id == idProductos);
            if (productosIndex != -1) {
                if (carrito[0].items[productosIndex].cantidad > 1) {
                    carrito[0].items[productosIndex].cantidad--
                    await carritosApi.putById(id, carrito[0])
                    res.status(200).json({ messaje: 'Producto borrado' })
                } else {
                    carrito[0].items.splice(productosIndex, 1)
                    await carritosApi.putById(id, carrito[0])
                    res.status(200).json({ messaje: 'Producto borrado' })
                }
            } else {
                res.status(400).json({ error: 'No existe carrito con ese ID' })
            }
        } catch (error) {
            res.status(400).json({ error: `Erro al intentar borrar producto del carrito - ${error}` })
        }
    } else {
        res.status(400).json({ error: 'Se necesita un ID de carrito y un ID de producto' })
    }
};
