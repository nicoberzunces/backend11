import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import viewsRouter from './routes/views.js';
import path from 'path';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'src/views'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

mongoose.connect('mongodb+srv://nicoberzunces02:DnZcOn4cUs3jdfca@coderback.kjuhq.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const io = new Server(server);
io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
});
