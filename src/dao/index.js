import { config } from 'dotenv';
config();

let cambiarBase = "mongo";
let productosDao;
let carritosDao;
let chatDao;
let ordenesDao;

switch (cambiarBase) {
    case 'mongo':
        const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js');
        const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js');
        const { default: ChatDaoMongoDb } = await import('./chat/ChatDaoMongoDb.js');
        const { default: OrdenDaoMongoDb } = await import('./ordenes/OrdenDaoMongoDb.js');
        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        chatDao = new ChatDaoMongoDb();
        ordenesDao = new OrdenDaoMongoDb ();
        break
    default:
        // do nothing;           
        break
};

export { productosDao, carritosDao, chatDao, ordenesDao };