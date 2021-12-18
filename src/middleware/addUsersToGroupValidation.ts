import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const schema = joi.object({
  usersId: joi.array().items(joi.string()).required(),
});

export const addUsersToGroupValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);
  if (error?.isJoi) {
    const mes = error.details[0].message;
    res.json(mes).status(400);
  } else {
    next();
  }
};
