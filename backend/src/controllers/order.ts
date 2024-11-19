import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { payment, email, phone, address, total, items } = req.body;

    // Проверка обязательных полей
    if (!payment || !email || !phone || !address || !total || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Некорректные данные' });
    }

    // Проверка поля `payment`
    const validPayments = ['card', 'online'];
    if (!validPayments.includes(payment)) {
      return res.status(400).json({ message: 'Некорректный способ оплаты' });
    }

    // Проверка корректности email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Некорректный email' });
    }

    // Получение товаров из базы данных
    const products = await Product.find({ _id: { $in: items } });

    // Проверка, что все товары существуют
    if (products.length !== items.length) {
      return res.status(400).json({ message: 'Некоторые товары не найдены' });
    }

    // Проверка, что у всех товаров есть цена
    const invalidProducts = products.filter((product) => product.price === null);
    if (invalidProducts.length > 0) {
      return res.status(400).json({ message: 'Некоторые товары недоступны для продажи' });
    }

    // Проверка, что сумма цен совпадает с переданным total
    const calculatedTotal = products.reduce((sum, product) => sum + (product.price || 0), 0);
    if (calculatedTotal !== total) {
      return res.status(400).json({ message: 'Общая сумма не совпадает с ценой товаров' });
    }

    // Генерация ID заказа
    const orderId = faker.string.uuid();

    // Возврат успешного ответа
    res.status(201).json({
      id: orderId,
      total: calculatedTotal,
    });
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
