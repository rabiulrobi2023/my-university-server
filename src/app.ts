import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/glogalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/', async (req, res) => {
  res.send('My-University server is running');
});

// const test = (req: Request, res: Response) => {
//   Promise.reject();

//   res.send(a);
// };
// app.get('/test', test);

app.use(globalErrorHandler);

app.use(notFoundRoute);

export default app;
