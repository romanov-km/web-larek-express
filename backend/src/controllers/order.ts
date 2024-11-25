import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import BadRequestError from '../errors/bad-request-error';
import Product from '../models/product';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { total, items } = req.body;
  try {
    // Получение товаров из базы данных
    const products = await Product.find({ _id: { $in: items } });

    // Проверка, что все товары существуют
    if (products.length !== items.length) {
      return next(new BadRequestError('Некоторые товары не найдены'));
    }

    // Проверка, что у всех товаров есть цена
    const invalidProducts = products.filter((product) => product.price === null);
    if (invalidProducts.length > 0) {
      return next(new BadRequestError('Некоторые товары недоступны для продажи'));
    }

    // Проверка, что сумма цен совпадает с переданным total
    const calculatedTotal = products.reduce((sum, product) => sum + (product.price || 0), 0);
    if (calculatedTotal !== total) {
      return next(new BadRequestError('Общая сумма не совпадает с ценой товаров'));
    }

    // Генерация ID заказа
    const orderId = faker.string.uuid();

    // Возврат успешного ответа
    return res.status(201).json({
      id: orderId,
      total: calculatedTotal,
    });
  } catch (error) {
    return next(error); // Передача ошибки в централизованный обработчик
  }
};

export default createOrder;
