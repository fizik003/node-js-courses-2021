import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const schema = joi.object({
  name: joi.string().required(),
  permission: joi.string().required(),
});

export const groupFieldValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error?.isJoi) {
    const mes = error.details[0].message;
    res.json(mes).status(400);
  } else {
    next();
  }
};
