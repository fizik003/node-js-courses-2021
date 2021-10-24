import express, { Request, Response } from 'express';

export const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running');
    return;
  }

  next();
});
