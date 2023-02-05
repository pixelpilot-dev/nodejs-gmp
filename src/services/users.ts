import { v4 as uuidv4 } from 'uuid';
import { USERS } from '../core/mocks/users.js';
import { TUser } from '../models/users.js';
import { CustomError } from '../models/CustomError.js';
import { HTTP_STATUS } from '../core/constants.js';

const isAvailableUser = (user: TUser) => !user.isDeleted;
const isUserNotFound = (user: TUser | undefined) => !user || user.isDeleted;

const getAvailableUsers = () => {
  return [...USERS.values()].filter(isAvailableUser);
};

const getAll = () => {
  return [...USERS.values()];
};

const getById = (id: string) => {
  const user = USERS.get(id);

  if (isUserNotFound(user)) {
    throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
  }

  return user;
};

const create = (data: TUser) => {
  const id = uuidv4();
  const { age, login, password } = data;

  const user: TUser = {
    id,
    age,
    login,
    password,
    isDeleted: false,
  };

  USERS.set(id, user);
  return user;
};

const removeById = (id: string) => {
  const user = USERS.get(id) as TUser;

  if (isUserNotFound(user)) {
    throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
  }

  USERS.set(user.id, {
    ...user,
    isDeleted: true,
  });

  return { message: 'User has been deleted' };
};

const updateById = (userId: string, data: TUser) => {
  const user = USERS.get(userId) as TUser;

  if (isUserNotFound(user)) {
    throw new CustomError('User not found', HTTP_STATUS.NOT_FOUND);
  }

  const { id, isDeleted } = user;
  const { age, login, password } = data;
  const updatedUser: TUser = {
    id,
    isDeleted,
    age: age ?? user.age,
    login: login ?? user.login,
    password: password ?? user.password,
  };

  USERS.set(id, updatedUser);

  return updatedUser;
};

const getAutoSuggestUsers = (loginSubstr: string, limit: number): TUser[] => {
  const users = [...USERS.values()];

  return users
    .filter(isAvailableUser)
    .filter(({ login }) => login.includes(loginSubstr))
    .slice(0, limit)
    .sort(({ login: a }, { login: b }) => a.localeCompare(b));
};

export {
  getAvailableUsers,
  getAll,
  getById,
  create,
  removeById,
  updateById,
  getAutoSuggestUsers,
};
