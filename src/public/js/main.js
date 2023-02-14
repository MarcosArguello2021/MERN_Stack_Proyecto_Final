const socket = io.connect();

const buttonChat = document.getElementById("enviar");

buttonChat?.addEventListener("click", () => {
  
    if (document.getElementById("email").value) {
        const fecha = new Date()
        const date = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
        const data = {
            email: document.getElementById("email").value,
            fecha: date,
            mensaje: document.getElementById("mensaje").value
        }
        document.getElementById('mensaje').value = ''
        socket.emit('cliente_nuevo_mensaje_chat', data)
    } else {
        document.getElementById('email').innerText = 'inserte un email valido'
        document.getElementById('mensaje').value = ''
    }
});

socket.on('lista_chat', chat => {
    document.getElementById('chat').innerHTML = ''
    chat.forEach(mensaje => {
            if (mensaje.isAdmin == true) {
                document.getElementById('chat').innerHTML += `
                <div style="width:100vw">
                    <span style="color: brown;">&nbsp[${mensaje.fecha}]</span>
                    <span style="color: blue;">Admin: &nbsp[${mensaje.email}]</span>
                    <span class="fst-italic" style="color: green;">&nbsp: ${mensaje.mensaje}</span>
                </div>
            `
            } else {
                document.getElementById('chat').innerHTML += `
                <div style="width:100vw">
                    <span style="color: brown;">&nbsp[${mensaje.fecha}]</span>
                    <span style="color: red;">&nbsp[${mensaje.email}]</span>
                    <span class="fst-italic" style="color: green;">&nbsp: ${mensaje.mensaje}</span>
                </div>
            `
            }
    })
});