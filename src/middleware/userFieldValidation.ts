import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const schema = joi.object({
  login: joi.string().required(),
  password: joi
    .string()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])/))
    .message('password must contain letters and numbers')
    .required(),
  age: joi.number().min(4).max(130).required(),
});

export const userFieldValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error?.isJoi) {
    const mes = error.details[0].message;
    res.json(mes).status(400);
  } else {
    next();
  }
};
