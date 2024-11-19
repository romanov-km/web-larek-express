import { celebrate, Joi, Segments } from 'celebrate';

export interface IOrder {
  total: number;
  email: string;
  phone: string;
  address: string;
  items: string[];
  payment: PaymentType;
}

export enum PaymentType {
  Card = 'card',
  Online = 'online'
}

export const imageSchema = Joi.object({
  fileName: Joi.string().required(),
  originalName: Joi.string().required(),
});

export const orderSchema = Joi.object({
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  payment: Joi.string().valid(...Object.values(PaymentType)).required(),
  total: Joi.number().required(),
  items: Joi.array().items(Joi.string().required()).required(),
});

export const productSchema = Joi.object({
  title: Joi.string().required().min(3).max(30),
  image: imageSchema.required,
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number(),
});
