import express from 'express';
import mongoose from "mongoose";

import userRouter from './src/routes/userRouter.js';
import cartRouter from './src/routes/cartRouter.js'


const app = express();
mongoose.connect('mongodb+srv://rociogaitan98rg:pRPAqndZAM5ZizsC@cluster0.zcivoyu.mongodb.net/newproyectbackend?retryWrites=true&w=majority');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});