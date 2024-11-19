import express from 'express';
import { createOrder } from '../controllers/order';
import { celebrate, Segments } from 'celebrate';
import { orderSchema } from '../middlewares/validations';

const router = express.Router();

const OrderValidator = celebrate({
  [Segments.BODY]: orderSchema,
});

// Маршрут для создания заказа
router.post('/order', createOrder, OrderValidator);

export default router;
