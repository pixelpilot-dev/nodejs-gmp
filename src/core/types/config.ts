import { Dialect } from 'sequelize';

export type TEnvs = 'production' | 'development';

type TDbEnvConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
};

export type TDbConfig = {
  [i in TEnvs]: TDbEnvConfig;
};
