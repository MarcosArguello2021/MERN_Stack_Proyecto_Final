import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";
import { Chat } from "../../models/chatModel.js";

class ChatDaoMongo extends ContenedorMongoDb {
    constructor() {
        super(Chat);
    }
};

export default ChatDaoMongo;