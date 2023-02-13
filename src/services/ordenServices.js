import {
    ordenesDao as ordenesApi,
    carritosDao as carritosApi,
} from '../dao/index.js';
import { mailPedido } from "../utils/armarMail.js"


export const getOrdenes = async (req, res) => {
    const ordenes = await ordenesApi.getAll();
    if (ordenes.length === 0) {
        res.send({ "error": "No existen ordenes guardadas" });
    } else {
        res.send(ordenes);
    }
};

export const getOrdenesById = async (req, res) => {
    const id = req.params.id;
    try {
        res.send(await ordenesApi.getById(id))
    } catch (error) {
        res.status(400).json({ error: '-1, No se encuentra la orden solicitada' })
    }
};

export const createOrden = async (req, res) => {
    const id = req.params.id;
    const carrito = await carritosApi.getById(id);
    const user = carrito[0].email;
    const numeroPedido = await ordenesApi.getAll();
    if (carrito) {
        try {
            const pedido = {
                items: carrito[0].items,
                ordenNumero: numeroPedido.length + 1,
                email: user,
                direccion: carrito[0].direccionEntrega,
            }
            await ordenesApi.save(pedido);
            await mailPedido(user, pedido);
            res.status(200).json({ message: `Orden generada` })
        } catch (error) {
            res.status(400).json({ error: `Error al generar la orden ${error}` })
        }
    } else {
        res.status(400).json({ error: 'No existe un carrito con ese ID' })
    }

};

const devolverNumeroPedido = async ()=>{
    const ordenNumero = await ordenesApi.getAll();
    const orden = 1
    if (ordenNumero == undefined || ordenNumero == '') {
        return orden;
    }else {
        orden = ordenNumero.length + 1
        return orden;
    }
}