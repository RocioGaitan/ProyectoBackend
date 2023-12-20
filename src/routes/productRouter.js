import { Router } from 'express';
import { getProducts, getProductById, createProduct, addProductToBusiness } from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);

router.get('/:pid', getProductById);
router.put('/:bid/product', addProductToBusiness);

export default router;
