import { Router } from 'express';
import productControllers from '../controllers/productController.js'

const router = Router();

// Ver productos
router.get('/', productControllers.getProducts);

// Ver producto por ID
router.get('/:pid', productControllers.productById);

// Agregar producto
router.post('/', productControllers.postProduct);

// Modificar producto
router.put('/:pid', productControllers.putProduct);

// Eliminar producto
router.delete('/:pid/:uid', productControllers.deleteProduct);

export default router;

