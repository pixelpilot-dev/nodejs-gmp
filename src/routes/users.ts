import express, { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, MIN_LIMIT } from '../core/constants.js';
import { CustomError } from '../models/CustomError.js';
import { validation } from '../middlewares/validation.js';
import { userSchema } from '../core/schema/user.js';
import UserService from '../services/users.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.status(HTTP_STATUS.SUCCESS).json(await UserService.getAll());
});

router.get(
  '/autosuggest',
  validation(userSchema.autoSuggest, 'query'),
  async (req: Request, res: Response) => {
    const { login = '', limit = MIN_LIMIT } = req.query;

    res.json(await UserService.getAutoSuggest(String(login), Number(limit)));
  },
);

router.get(
  '/:id',
  validation(userSchema.userId, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.getById(req.params.id);

    user
      ? res.json(user)
      : next(new CustomError('Error', HTTP_STATUS.NOT_FOUND, 'User not found'));
  },
);

router.post(
  '/',
  validation(userSchema.user, 'body'),
  async (req: Request, res: Response) => {
    res.status(HTTP_STATUS.CREATED).json(await UserService.create(req.body));
  },
);

router.delete(
  '/:id',
  validation(userSchema.userId, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.removeById(req.params.id);

    user
      ? res.json({ message: 'User has been deleted' })
      : next(new CustomError('Error', HTTP_STATUS.NOT_FOUND, 'User not found'));
  },
);

router.put(
  '/:id',
  validation(userSchema.userId, 'params'),
  validation(userSchema.user, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.update(req.params.id, req.body);

    user
      ? res.json(user)
      : next(new CustomError('Error', HTTP_STATUS.NOT_FOUND, 'User not found'));
  },
);

export default router;
