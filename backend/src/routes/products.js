import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticate } from '../middleware/auth.js';
import { csrfProtection } from '../middleware/csrf.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', apiLimiter, getProducts);
router.post('/', authenticate, csrfProtection, createProduct);
router.put('/:id', authenticate, csrfProtection, updateProduct);
router.delete('/:id', authenticate, csrfProtection, deleteProduct);

export default router;