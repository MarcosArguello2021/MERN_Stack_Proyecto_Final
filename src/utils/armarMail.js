import { enviarMail } from "../utils/nodemailer.js";

export const mailRegistro = (user) => {
    const { nombre, celular, username, rol } = user;
    const asunto = 'Nuevo Registro de usuario'
    const cuerpoMail = `
    <ul>
    <li>Nombre: ${nombre}</li>
    <li>Celular/Movil: ${celular}</li>
    <li>E-mail: ${username}</li>
    <li>Rol: ${rol}</li>
    </ul>`
    enviarMail(asunto, cuerpoMail)
};

export const mailPedido = (user, pedido) => {
    const asunto = `Nuevo pedido de ${user}`
    const listaProd = pedido.items;
    let totalProducto = 0
    let total = 0
    let tabla = listaProd.reduce((acu, producto) => { 
        totalProducto += producto.cantidad
        total += producto.cantidad * producto.producto.precio
        acu += `   <tr>
                        <td> ${producto.cantidad} </td>
                        <td> ${producto.producto.nombre} </td>
                        <td> ${producto.producto.descripcion} </td>
                        <td> $${producto.producto.precio} </td>
                        <td> $${producto.cantidad * producto.producto.precio} </td>
                    </tr>`
        return acu
    }, '')
    
    const cuerpoMail = ` <h2>Nueva orden generada del usuario ${pedido.email}</h2>
    <h4>N° de orden: ${pedido.ordenNumero}</h4>
    <h4>Dirección: ${pedido.direccion}</h4>
    <h5>Cantidad de articulos: ${totalProducto}</h5>
    <h5>Monto total del pedido: $${total}</h5>
    <table>
        <thead>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Parcial</th>
        </thead>
        <tbody>${tabla}</tbody>
    </table>`
    enviarMail(asunto, cuerpoMail)
};