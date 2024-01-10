//imports
import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from "cors";
import handlebars from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { fileURLToPath } from 'url';

import userRouter from './src/routes/userRouter.js';
import cartRouter from './src/routes/cartRouter.js';
import ordersRouter from './src/routes/ordersRouter.js';
import productRouter from './src/routes/productRouter.js';
import emailRouter from './src/routes/emailRouter.js';
import ticketsRouter from './src/routes/ticketsRouter.js';
import initializePassport from './src/dao/passport/passportConfig.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
//mongoose.connect('mongodb://127.0.0.1:27017/rocionewproyect');

const uri = 'mongodb+srv://rociogaitan98rg:pRPAqndZAM5ZizsC@cluster0.zcivoyu.mongodb.net/proyectnewr?retryWrites=true&w=majority';
mongoose.connect(uri);

//Unique domain cors
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT']
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Usar express-session middleware
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//configuracion handlebars
app.engine('handlebars', handlebars());
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');


//servidor estatico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())


//routes
app.use('/api/sessions', userRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/product', productRouter);
app.use('/api/email', emailRouter);
app.use('/api/tickets', ticketsRouter);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});