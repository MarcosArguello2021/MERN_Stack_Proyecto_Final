import express from 'express';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import socket from './utils/socket.js';
import { userRouter } from './routes/user.js';
import { productosRouter } from './routes/productos.js';
import { carritoRouter } from './routes/carrito.js';
import { chatRouter } from './routes/chat.js';
import { ordenRouter } from './routes/orden.js';
import { engine } from 'express-handlebars';
import passport from './utils/passport.js'
import { jwtStrategy } from './utils/jwt.js';
import cookieParser from 'cookie-parser'
import { logger } from './utils/logger.js'
import config from '../config.js';

const app = express();
const http = new HTTPServer(app)

//socket.io
const io = new IOServer(http)
socket(io);

//passport
passport.use(jwtStrategy)
app.use(passport.initialize())
app.use(cookieParser(process.env.SECRET_KEY))

//express middleware
app.use(express.static('./src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars middleware
app.set('views', './src/public/views');
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//rutas
app.use('/', userRouter);
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/chat', chatRouter)
app.use('/api/orden', ordenRouter)
app.use('/server', (req, res) => {
  res.render('server')
});
app.use((req, res) => {
  logger.warn('Error de ruta - No encontrada')
  res.status(404).render('failRoute')
})

//inicio servidor
const PORT = config.port.puerto || 8080;
app.set('port', PORT);
const main = http.listen(PORT, () => {
  logger.info('Servidor escuchando en el puerto:', PORT)
})
main.on('error', error => logger.error(error))