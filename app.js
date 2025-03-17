import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express();
const PORT = 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(path.resolve(), 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

import viewsRouter from './routes/views.js';
app.use('/', viewsRouter);

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('newProduct', (product) => {
        io.emit('updateProducts', product);
    });

    socket.on('deleteProduct', (productId) => {
        io.emit('removeProduct', productId);
    });
});

export { io };
