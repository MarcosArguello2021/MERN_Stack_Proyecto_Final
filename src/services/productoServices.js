import { productosDao as productosApi } from '../dao/index.js';

export const getProduct = async (req, res) => {
    const productos = await productosApi.getAll()
    if (productos.length === 0) {
        res.send({ "error": "No existen productos cargados" })
    } else {
        res.send(productos)
    }
};

export const getProductById = async (req, res) => {
    const idParam = req.params.id;
    try {
        res.send(await productosApi.getById(idParam))
    } catch (error) {
        res.status(400).json({ error: '-1, No se encuentra el producto' })
    }
};

export const getProductByCategory = async (req, res) => {
    const categoriaId = req.params.categoriaId;
    const productos = await productosApi.getAllByCategory(categoriaId);
    if (productos.length === 0) {
        res.send({ "error": "No existen productos cargados con esa categoria" })
    } else {
        res.send(productos)
    }
};

export const saveProduct = async (req, res) => {
    const data = req.body;
    const { nombre, precio, urlImagen, descripcion, categoria } = data;
    if (!nombre || !precio || !urlImagen || !descripcion || !categoria) {
        res.status(400).json({ error: 'por favor, ingrese todos los datos del producto' })
    } else {
        let objeto = [];
        const objetos = await productosApi.getAll();
        let newId;
        if (objetos.length == 0) {
            newId = 1;
        } else {
            const ultimoId = parseInt(objetos[objetos.length - 1].id);
            newId = ultimoId + 1;
        }
        const timeStamp = Date.now()
        objeto.push({
            ...data, id: newId, timeStamp: timeStamp
        });
        try {
            await productosApi.save(objeto)
            res.status(200).json({ mensaje: 'Nuevo producto guardado' })
        } catch (error) {
            res.status(500).json({ error: 'Error al guardar' })
        }
    }
};

export const updateProduct = async (req, res) => {
    const idParam = req.params.id;
    const { nombre, precio, urlImagen, descripcion, categoria } = req.body;
    if (!nombre || !precio || !urlImagen || !descripcion || !categoria) {
        res.status(400).json({ error: 'Por favor, ingrese todos los datos del producto' })
    } else {
        try {
            let lista = await productosApi.getById(idParam);
            if (lista === -1) {
                return res.status(200).json({ error: 'Producto no encontrado' });
            } else {
                const actualizacion = {
                    "nombre": nombre,
                    "precio": precio,
                    "urlImagen": urlImagen,
                    "descripcion": descripcion,
                    "categoria": categoria,
                };
                let timeStamp = Date.now();
                lista = { ...actualizacion, timeStamp: timeStamp };
                await productosApi.putById(idParam, lista)
                res.status(200).json({ mensaje: 'Producto actualizado con exito' })
            }
        } catch (err) {
            throw new Error(err);
        }
    }
};

export const deleteProductById = async (req, res) => {
    const idParam = req.params.id;
    try {
        const producto = await productosApi.getById(idParam)
        if (!producto) {
            return res.status(400).json({ error: "Producto no encontrado" });
        } else {
            await productosApi.deleteById(idParam);
            res.status(200).json({ mensaje: 'Producto borrado con exito' })
        }
    } catch (error) {
        res.status(400).json({ error: '-1, No se encontró el ID' })
    }
};
