import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import NotFoundError from './errors/not-found-error';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

mongoose.connect('mongodb://127.0.0.1:27017/weblarek')
  .catch((error) => error('Ошибка при подключении к MongoDB:', error));

const app = express();

app.use(requestLogger);

app.use(cors());

app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам

app.use(bodyParser.json());

app.use(productRoutes);
app.use(orderRoutes);
app.use('*', (_req, _res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(helmet());

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
