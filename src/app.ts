import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { routes } from './app/routes';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROOT ROUTE
app.get('/', (req: Request, res: Response) => {
  res.send('Running.....');
});

// Application routes
app.use('/api/v1', routes);

// ERROR HANDLER MIDDLEWARE
app.use(globalErrorHandler);

export default app;
