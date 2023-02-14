import { Router } from "express";
import { authJWT } from "../utils/jwtAuth.js";
import { crearOrden, listarOrdenPorId, listarOrdenes } from "../controllers/ordenController.js";

export const ordenRouter = Router()
//ordenRouter.use(authJWT);
ordenRouter.get('/orden', listarOrdenes);//Se listan todas las ordenes generadas.
ordenRouter.get('/orden/:id', listarOrdenPorId);//Recibe un id de Orden y devuelve la misma.
ordenRouter.post('/orden/:id', crearOrden);//Recibe el id de un carrito y genera una nueva Orden.