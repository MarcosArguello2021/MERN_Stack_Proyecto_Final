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
// carritoRouter.use(authJWT);
carritoRouter.post('/carrito/:id', crearCarrito);//Recibe ID usuario (email) y crea un carrito y lo devuelve.
carritoRouter.delete('/carrito/:id', borrarCarrito); //Recibe ID usuario (email) y borra el carrito.
carritoRouter.get('/carrito/:id/productos', buscarPorIdCarrito);//Recibe el parametro ID (_id carrito) y lo muestra.
carritoRouter.post('/carrito/:id/:idProductos', actualizarCarrito); //Recibe primero el ID de carrito (_id carrito) y recibe el idProducto a ingresar al carrito.
carritoRouter.delete('/carrito/:id/productos/:idProductos', borrarProductoCarritoPorId);//Recibe ID de carrito y el ID del producto. Borra el producto pasado.