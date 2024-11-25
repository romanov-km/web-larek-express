import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { createProduct, getProducts } from '../controllers/product';
import { productSchema } from '../middlewares/validations';

const router = express.Router();

const ProductValidator = celebrate({
  [Segments.BODY]: productSchema,
});

// Маршрут для получения всех товаров
router.get('/product', getProducts);

// Маршрут для создания нового товара
router.post('/product', ProductValidator, createProduct);

export default router;
