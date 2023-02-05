import express from 'express';
import { validation } from '../middlewares/validation.js';
import { userSchema } from '../core/schema/user.js';
import * as Controller from '../controllers/users.js';

const router = express.Router();

router.get('/', Controller.get);
router.get('/all', Controller.getAll);

router.get(
  '/autosuggest',
  validation(userSchema.autoSuggest, 'query'),
  Controller.getAutoSuggest,
);

router.get('/:id', validation(userSchema.userId, 'params'), Controller.getById);

router.post('/', validation(userSchema.user, 'body'), Controller.create);

router.delete(
  '/:id',
  validation(userSchema.userId, 'params'),
  Controller.remove,
);

router.put(
  '/:id',
  validation(userSchema.userId, 'params'),
  validation(userSchema.user, 'body'),
  Controller.update,
);

export default router;
