import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";

import {Orden} from "../../models/ordenModel.js"

class OrdenDaoMongo extends ContenedorMongoDb {
    constructor() {
        super(Orden);
    }
};

export default OrdenDaoMongo;