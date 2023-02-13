import {deleteProductById, getProduct, getProductById, getProductByCategory, saveProduct, updateProduct} from '../services/productoServices.js';

export const listarProductos = async (req, res) => {
    try {
        await getProduct(req, res)    
     } catch (error) {
         res.status(400).json({ error: `${error}` })
     }    
}

export const buscarPorId = async (req, res) => {
    try {
        res.send(await getProductById(req, res))
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }   
}

export const buscarPorCategoria = async (req, res) => {
    try {
        res.send(await getProductByCategory(req, res))
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }   
}

export const guardarProducto = async (req, res) => {
    try {
        await saveProduct(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }   
}

export const actualizarProducto = async (req, res) => { 
    try {
        await updateProduct(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }   
}

export const borrarProducto = async (req, res) => {
    try {
        await deleteProductById(req, res)
    } catch (error) {
        res.status(400).json({ error: `${error}` })
    }   
}
