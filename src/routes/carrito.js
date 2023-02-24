import { Router } from "express";
import {
    crearCarrito,
    borrarCarrito,
    buscarPorIdCarrito,
    actualizarCarrito,
    borrarProductoCarritoPorId
}
    from "../controllers/carritoController.js";
import { authJWT } from "../utils/jwtAuth.js";

export const carritoRouter = Router();
carritoRouter.use(authJWT);
carritoRouter.post('/:id', crearCarrito);//Recibe ID usuario (email) y crea un carrito y lo devuelve.
carritoRouter.delete('/:id', borrarCarrito); //Recibe ID usuario (email) y borra el carrito.
carritoRouter.get('/:id/productos', buscarPorIdCarrito);//Recibe el parametro ID (_id carrito) y lo muestra.
carritoRouter.post('/:id/:idProductos', actualizarCarrito); //Recibe primero el ID de carrito (_id carrito) y recibe el idProducto a ingresar al carrito.
carritoRouter.delete('/:id/productos/:idProductos', borrarProductoCarritoPorId);//Recibe ID de carrito y el ID del producto. Borra el producto pasado.