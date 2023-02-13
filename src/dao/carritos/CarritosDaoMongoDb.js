import ContenedorMongo from "../../containers/ContenedorMongoDb.js";
import { Carrito } from "../../models/carritoModel.js";

class CarritosDaoMongo extends ContenedorMongo {
    constructor() {
        super(Carrito)
    }
};

export default CarritosDaoMongo;