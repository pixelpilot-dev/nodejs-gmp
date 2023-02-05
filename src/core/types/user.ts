import { Optional } from 'sequelize';

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
}

export type IUserCreate = Optional<IUser, 'id'>;
