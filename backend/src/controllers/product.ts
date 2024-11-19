import { Request, Response } from 'express';
import Product from '../models/product';

export const createProduct = (req: Request, res: Response): void => {
  const {
    title,
    image,
    category,
    description,
    price,
  } = req.body;

  Product.create({
    title,
    image,
    category,
    description: description || '',
    price: price || null,
  })
    .then((product) => {
      res.status(201).send({ data: product });
    })
    .catch((error) => {
      console.error('Ошибка при создании товара:', error);
      res.status(500).send({ message: 'Ошибка при создании товара' });
    });
};

export const getProducts = (_req: Request, res: Response): void => {
  Product.find()
    .then((products) => {
      res.status(200).json({ items: products, total: products.length });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Ошибка сервера', error });
    });
};
