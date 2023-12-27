//imports
import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import handlebars from 'express-handlebars';
import path from 'path';


import userRouter from './src/routes/userRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import ordersRouter from './src/routes/ordersRouter.js';
import productRouter from './src/routes/productRouter.js';
import mailRouter from './src/routes/emailRouter.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
//mongoose.connect('mongodb://127.0.0.1:27017/rocionewproyect');
mongoose.connect('mongodb+srv://rociogaitan98rg:pRPAqndZAM5ZizsC@cluster0.zcivoyu.mongodb.net/newproyectbackend?retryWrites=true&w=majority');

//Unique domain cors
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT']
}));

//vistas
app.engine("handlebars", handlebars.engine());
app.set('views', path.join(path.resolve(), 'views'));
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/product', productRouter);
app.use('/api/email', mailRouter)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});