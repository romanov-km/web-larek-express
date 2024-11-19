import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import BadRequestError from '../errors/bad-request-error';
import { CelebrateError } from 'celebrate';

// Базовый обработчик ошибок
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof CelebrateError) {
    return res.status(400).json({ message: 'Ошибка валидации данных' });
  }

  if ('statusCode' in err && typeof err.statusCode === 'number') {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'На сервере произошла ошибка' });
};

export default errorHandler;
