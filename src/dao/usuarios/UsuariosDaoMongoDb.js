import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { User } from "../../models/userModel.js";

class UsuariosDaoMongo extends ContenedorMongoDb {
    constructor() {
        super(User);
    }
};

export default UsuariosDaoMongo;