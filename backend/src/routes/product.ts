import express from 'express';
import { createProduct, getProducts } from '../controllers/product';
import { productSchema } from '../middlewares/validations';
import { celebrate, Segments } from 'celebrate';

const router = express.Router();

const ProductValidator = celebrate({
  [Segments.BODY]: productSchema,
});

// Маршрут для получения всех товаров
router.get('/product', getProducts);

// Маршрут для создания нового товара
router.post('/product', createProduct, ProductValidator);

export default router;
