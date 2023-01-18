import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationResult } from 'joi';
import { CustomError } from '../models/CustomError.js';
import { HTTP_STATUS } from '../core/constants.js';

export const validation =
  (schema: Schema, entity: 'body' | 'params' | 'query') =>
  (req: Request, res: Response, next: NextFunction) => {
    const result: ValidationResult = schema.validate(req[entity]);

    if (!result.error) {
      next();
    } else {
      throw new CustomError(
        'validation error',
        HTTP_STATUS.BAD_REQUEST,
        result.error.details.map(({ message }) => message),
      );
    }
  };
