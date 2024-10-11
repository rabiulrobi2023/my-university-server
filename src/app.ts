import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
import { StudentsRoutes } from './app/modules/student/students.route';
import globalErrorHandler from './app/middlewares/glogalErrorHandler';

const app: Application = express();

//=====================Parser===================
app.use(express.json());
app.use(express.text());
app.use(cors());

//=====================API===================
app.use('/api/v1/students/', StudentsRoutes);
app.use('/api/v1/user/', userRoutes);

app.get('/', (req, res) => {
  res.send('My-University server is running');
});

//=====================Wrong API Error Handler===============
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});

//=====================Global Error Handler===============
app.use(globalErrorHandler);

export default app;
