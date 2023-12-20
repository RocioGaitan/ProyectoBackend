import Order from '../dao/classes/orderDAO.js';
import User from '../dao/classes/userDAO.js';
import Product from '../dao/classes/productDAO.js'; 

const orderService = new Order();
const userService = new User();
const productService = new Product(); 

const responseError = {
    status: 'error',
    error: 'Algo salió mal, inténtalo de nuevo más tarde'
};

export const getOrders = async (req, res) => {
    const result = await orderService.getOrders();
    
    if (!result) return res.status(500).send(responseError);
    res.send({ status: 'success', result });
};

export const getOrderById = async (req, res) => {
    const { oid } = req.params;
    const result = await orderService.getOrderById(oid);

    if (!result) return res.status(500).send(responseError);
    res.send({ status: 'success', result });
};

export const createOrder = async (req, res) => {
    const { user, products } = req.body; //estructura del body

    const resultUser = await userService.getUserById(user);

    if (!resultUser) return res.status(500).send(responseError);

    const actualProducts = await productService.getProductsByIds(products); //Obtener productos por ID

    const sum = actualProducts.reduce((acc, product) => {
        acc += product.price;
        return acc;
    }, 0);

    const orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);

    const order = {
        number: orderNumber,
        user,
        status: 'pending',
        products: actualProducts.map(product => product._id), //Utilizando ID de productos
        totalPrice: sum
    };

    const orderResult = await orderService.createOrder(order);
    
    if (!orderResult) return res.status(500).send(responseError);
    res.send({ status: 'success', result: orderResult });
};

export const resolveOrder = async (req, res) => {
    const { status } = req.body;
    const order = await orderService.getOrderById(req.params.oid);

    if (!order) return res.status(500).send(responseError);

    order.status = status;
    const result = await orderService.resolveOrder(order._id, order);

    if (!result) return res.status(500).send(responseError);

    res.send({ status: 'success', result: 'Order resolved' });
};
