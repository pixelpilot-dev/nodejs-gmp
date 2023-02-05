import User from '../models/users.js';
import { Op } from 'sequelize';

export default class UserService {
  static getAll(): Promise<User[]> {
    return User.findAll();
  }

  static getById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  static getAutoSuggest(login: string, limit: number): Promise<User[]> {
    return User.findAll({
      where: {
        login: {
          [Op.substring]: login,
        },
      },
      limit,
    });
  }

  static create({ age, login, password }: User): Promise<User> {
    return User.create({
      age,
      login,
      password,
    });
  }

  static removeById(id: string) {
    return User.destroy({
      where: {
        id,
      },
    });
  }

  static async update(
    id: string,
    { login, password, age }: User,
  ): Promise<[User, boolean | null] | null> {
    const user = await UserService.getById(id);

    if (!user) {
      return null;
    }

    return User.upsert(
      {
        id,
        age: age ?? user.age,
        login: login ?? user.login,
        password: password ?? user.password,
      },
      { returning: true },
    );
  }
}
