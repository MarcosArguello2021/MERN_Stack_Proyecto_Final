import { Router } from "express";
import {
    listarProductos,
    buscarPorId,
    guardarProducto,
    borrarProducto,
    actualizarProducto,
    buscarPorCategoria
} from "../controllers/productoController.js";
import { authJWT } from "../utils/jwtAuth.js";

export const productosRouter = Router();
productosRouter.use(authJWT);
productosRouter.get('/productos', listarProductos);//Listar Productos
productosRouter.get('/productos/:id?', buscarPorId);//Recibe ID de Producto y muestra sus propiedades
productosRouter.get('/productos/categoria/:categoriaId', buscarPorCategoria); //Recibe categoriaID (ejemplo: "cocina") de Producto y muestra el listado.
productosRouter.post('/productos', guardarProducto);
productosRouter.put('/productos/:id', actualizarProducto);//Recibe id del producto y actualizar producto
productosRouter.delete('/productos/:id', borrarProducto);//Recibe id del producto y lo borra 