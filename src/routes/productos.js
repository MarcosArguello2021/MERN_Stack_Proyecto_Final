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
productosRouter.get('/', listarProductos);//Listar Productos
productosRouter.post('/', guardarProducto);
productosRouter.get('/:id?', buscarPorId);//Recibe ID de Producto y muestra sus propiedades
productosRouter.put('/:id', actualizarProducto);//Recibe id del producto y actualizar producto
productosRouter.delete('/:id', borrarProducto);//Recibe id del producto y lo borra 
productosRouter.get('/categoria/:categoriaId', buscarPorCategoria); //Recibe categoriaID (ejemplo: "cocina") de Producto y muestra el listado.
