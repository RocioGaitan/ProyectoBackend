import express from 'express';
import mongoose from "mongoose";
import cors from "cors";

import userRouter from './src/routes/userRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import ordersRouter from './src/routes/ordersRouter.js';
import productRouter from './src/routes/productRouter.js';


const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/rocionewproyect');
//mongoose.connect('mongodb+srv://rociogaitan98rg:pRPAqndZAM5ZizsC@cluster0.zcivoyu.mongodb.net/newproyectbackend?retryWrites=true&w=majority');

// Unique Domain CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/product', productRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});