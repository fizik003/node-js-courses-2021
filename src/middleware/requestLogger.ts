import { Request, Response, NextFunction } from 'express';
import log from '../common/logger';

export const requestLogger = async (req: Request, res: Response, next: NextFunction) => {
  const { params, query } = req;
  log.info(
    `Method: ${req.method}, params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}`
  );
  next();
};
