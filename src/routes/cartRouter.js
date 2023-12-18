import {Router} from 'express';

import CartController from '../controllers/cartController.js';

const router = Router();

const cartController = new CartController();

router.get('/', async (req, res) => {
    const result = await cartController.getAllCarts();

    res.send({
        status: 'success',
        payload: result
    });
});

router.get('/:id', async (req, res) => {

    try {
        const result = await cartController.getCartByID(req.params.id);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await cartController.createCart(req.body);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router;