import mongoose from 'mongoose'
import config from '../../config.js'
import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'

class ContenedorMongoDb {

    constructor(model) {
        this.coleccion = model;
    };

    async getAll(){
        await mongoose.connect(config.mongodb.uri, config.mongodb.options)
        try{
            const respuesta = await this.coleccion.find().sort({id: 1})
            mongoose.connection.close()
            return respuesta
        }catch(err){
            return []     
        }
    };

    async getById(id){
        await mongoose.connect(config.mongodb.uri, config.mongodb.options)
        try{
            const respuesta = await this.coleccion.find({_id:{$eq: `${id}`}})
            mongoose.connection.close()
            if(respuesta.length === 0) {
                throw new Error(`No se ecuentra el ID: ${err}`)
            }else {
                return respuesta
            }
        }catch(err){
            throw new Error(`Error leer el ID de archivo: ${err}`)
        }
    };

    async getAllByCategory(category){
        await mongoose.connect(config.mongodb.uri, config.mongodb.options)
        try{
            const respuesta = await this.coleccion.find({ categoria: category }).sort({id: 1})
            mongoose.connection.close()
            return respuesta
        }catch(err){
            return []     
        }
    };

    
    async save(newObj){
        await mongoose.connect(config.mongodb.uri, config.mongodb.options)
        try {
            let doc = await this.coleccion.create(newObj);
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            mongoose.connection.close()
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async putById(id,newObj){
        await mongoose.connect(config.mongodb.uri, config.mongodb.options)
        try{
            await this.coleccion.replaceOne({_id:{$eq: `${id}`}} ,newObj)
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    };

    async deleteById(id){
        await mongoose.connect(config.mongodb.uri, config.mongodb.options)
        try{
            await this.coleccion.deleteOne({_id:{$eq: `${id}`}})
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    };

    async deleteAll(){
        await mongoose.connect(config.mongodb.uri, config.mongodb.options)
        try{
            await this.coleccion.deleteMany({})
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
};

export default ContenedorMongoDb;
