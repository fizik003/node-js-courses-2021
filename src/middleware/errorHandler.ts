import { Request, Response, NextFunction } from 'express';
import log from '../common/logger';
import { CustomError } from '../common/errors';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err?.status) {
    const { params, query } = req;
    const logMessage = `Method: ${req.method}, params: ${JSON.stringify(
      params
    )}, query: ${JSON.stringify(query)}, Message: ${err.message}`;
    log.error(logMessage);
    res.status(err.status).send(err.message);
  } else {
    log.error(`Internal error: ${err.stack}`);
    res.status(500).send('Internal server error');
  }
  next();
};
