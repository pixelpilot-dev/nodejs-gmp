import { Sequelize } from 'sequelize';
import DBConfig from '../core/config/db.json' assert { type: 'json' };
import { TDbConfig, TEnvs } from '../core/types/config.js';

const env = (process.env.NODE_ENV || 'development') as TEnvs;
const config = DBConfig as TDbConfig;
const envConfig = config[env];

const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    ...envConfig,
    logging: (...msg) => console.log(msg),
  },
);

export default sequelize;
