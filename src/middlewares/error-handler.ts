import { Request, Response } from 'express';
import { CustomError } from '../models/CustomError.js';

const errorHandler = (
  error: TypeError | CustomError,
  req: Request,
  res: Response,
) => {
  let customError = error;

  if (!(error instanceof CustomError)) {
    customError = new CustomError('Something went wrong');
  }

  res.status((customError as CustomError).status).send(customError);
};

export default errorHandler;
