import { NextFunction, Request, Response } from 'express';
import ConflictError from '../errors/conflict-error';
import Product from '../models/product';

export const createProduct = (req: Request, res: Response, next: NextFunction): void => {
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
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new ConflictError(error.message));
      }
      return next(error);
    });
};

export const getProducts = (_req: Request, res: Response, next: NextFunction): void => {
  Product.find()
    .then((products) => {
      res.status(200).json({ items: products, total: products.length });
    })
    .catch((error) => next(error));
};
