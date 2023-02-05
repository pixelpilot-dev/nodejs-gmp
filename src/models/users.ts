import { Model, DataTypes, UUIDV4 } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../data-access/index.js';
import { IUser, IUserCreate } from '../core/types/user.js';
import { MAX_STRING_LENGTH } from '../core/constants.js';

class User extends Model<IUser, IUserCreate> implements IUser {
  public id!: string;
  public login!: string;
  public password!: string;
  public age!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    login: {
      type: new DataTypes.STRING(MAX_STRING_LENGTH),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(MAX_STRING_LENGTH),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.id = uuidv4();
      },
    },
    sequelize,
  },
);

export default User;
