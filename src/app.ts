import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/glogalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';

const app: Application = express();

//=====================Parser===================
app.use(express.json());
app.use(express.text());
app.use(cors());

//=====================API===================
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('My-University server is running');
});

//=====================Global Error Handler===============
app.use(globalErrorHandler);

//=====================Wrong API Error Handler===============
app.use(notFoundRoute);

export default app;
