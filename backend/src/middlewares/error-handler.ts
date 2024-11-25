import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'Внутренняя ошибка сервера. Попробуйте позже.'
    : err.message;

  if (statusCode === 500) {
    console.error('Ошибка сервера:', err);
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });

  next();
};

export default errorHandler;
