import express, { Request, Response } from 'express';
import { userRouter, groupRouter } from './routers';
import { requestLogger, errorHandler } from './middleware';
import log from './common/logger';

export const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/', (req: Request, res: Response, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running');
    return;
  }

  next();
});

app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use(errorHandler);

process
  .on('uncaughtException', (err: Error) => {
    log.error(`Uncaught Exception: ${err.stack}`);
    process.exit(1);
  })
  .on('unhandledRejection', (err: Error) => {
    log.error(`Unhandled rejection detected: ${err.message}`);
    process.exit(1);
  });

// for check
// Promise.reject(Error('Oops!'));
// throw Error('Oops!');
