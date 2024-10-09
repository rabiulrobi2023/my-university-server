import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentsRoutes } from './app/modules/student/students.route';

const app: Application = express();

//=====================Parser===================
app.use(express.json());
app.use(express.text());
app.use(cors());

app.use('/api/v1/students/', StudentsRoutes);
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
app.use((error: string, req: Request, res: Response) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
    });
  }
});

export default app;
