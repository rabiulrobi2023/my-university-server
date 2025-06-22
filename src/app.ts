import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/glogalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173/'],
  }),
);

app.use('/api/v1', router);

app.get('/', async (req, res) => {
  res.send('My-University server is ru...');
});

app.use(globalErrorHandler);

app.use(notFoundRoute);

export default app;
