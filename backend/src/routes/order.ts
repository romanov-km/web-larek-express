import express from 'express';
import { celebrate, Segments } from 'celebrate';
import createOrder from '../controllers/order';
import { orderSchema } from '../middlewares/validations';

const router = express.Router();

const OrderValidator = celebrate({
  [Segments.BODY]: orderSchema,
});

// Маршрут для создания заказа
router.post('/order', OrderValidator, createOrder);

export default router;
