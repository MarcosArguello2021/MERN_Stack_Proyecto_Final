import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { Product } from "../../models/productosModel.js";

class ProductosDaoMongo extends ContenedorMongoDb {
    constructor() {
        super(Product);
    }
};

export default ProductosDaoMongo;