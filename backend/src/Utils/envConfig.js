import dotenv from 'dotenv';
dotenv.config({ debug: true, path: './src/_settings.env' });

export const ENV_CONFIG = {
  apiServerPort: { env: 'API_PORT', default: 6010 },
  sequelizeDialect: { env: 'API_SEQUELIZE_DIALECT', default: 'postgres' },
  sequelizeLogging: { env: 'API_SEQUELIZE_LOGGING', default: false },
  sequelizeLogQueryParams: { env: 'API_SEQUELIZE_LOG_PARAMS', default: false },
  sequelizePoolMin: { env: 'API_SEQUELIZE_POOL_MIN_CONNECTION', default: 1 },
  sequelizePoolMax: { env: 'API_SEQUELIZE_POOL_MAX_CONNECTION', default: 5 },
  sequelizePoolIdleTimeout: { env: 'API_SEQUELIZE_POOL_IDLE_TIMEOUT', default: 10 },
  sequelizePoolAcquireInterval: { env: 'API_SEQUELIZE_POOL_ACQUIRE_INTERVAL', default: 30 },
  sequelizeDbHost: { env: 'API_SEQUELIZE_DB_HOST', default: 'localhost' },
  sequelizeDbPort: { env: 'API_SEQUELIZE_DB_PORT', default: 5432 },
  sequelizeDbName: { env: 'API_SEQUELIZE_DB_NAME' },
  sequelizeDbUser: { env: 'API_SEQUELIZE_DB_USER' },
  sequelizeDbPassword: { env: 'API_SEQUELIZE_DB_PASS' },
};

export const getEnv = (key) => (ENV_CONFIG[key] ? process.env[ENV_CONFIG[key].env] || ENV_CONFIG[key].default : null);
