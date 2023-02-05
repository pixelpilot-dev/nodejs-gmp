import { Request, Response, NextFunction } from 'express';
import * as Service from '../services/users.js';
import { HTTP_STATUS, MIN_LIMIT } from '../core/constants.js';

const get = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(HTTP_STATUS.SUCCESS).json(Service.getAvailableUsers());
  } catch (err) {
    console.error('Error while getting available users');
    next(err);
  }
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(HTTP_STATUS.SUCCESS).json(Service.getAll());
  } catch (err) {
    console.error('Error while getting all users');
    next(err);
  }
};

const getAutoSuggest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login = '', limit = MIN_LIMIT } = req.query;
    res
      .status(HTTP_STATUS.SUCCESS)
      .json(Service.getAutoSuggestUsers(String(login), Number(limit)));
  } catch (err) {
    console.error('Error while getting auto-suggest users');
    next(err);
  }
};

const getById = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(HTTP_STATUS.SUCCESS).json(Service.getById(req.params.id));
  } catch (err) {
    console.error('Error while getting user by id');
    next(err);
  }
};

const create = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(HTTP_STATUS.CREATED).json(Service.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`);
    next(err);
  }
};

const remove = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(HTTP_STATUS.SUCCESS).json(Service.removeById(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`);
    next(err);
  }
};

const update = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(HTTP_STATUS.SUCCESS)
      .json(Service.updateById(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`);
    next(err);
  }
};

export { get, getAll, getAutoSuggest, getById, create, remove, update };
