import { Sequelize } from 'sequelize';
import { getEnv } from '../envConfig';

const SEQUELIZE_CONFIG = {
  dialect: getEnv('sequelizeDialect'),
  logging: getEnv('sequelizeLogging') === 'true',
  logQueryParameters: getEnv('sequelizeLogQueryParams') === 'true',
  minifyAliases: true,
  define: {
    freezeTableName: true,
  },
  pool: {
    min: Number(getEnv('sequelizePoolMin')),
    max: Number(getEnv('sequelizePoolMax')),
    idle: Number(getEnv('sequelizePoolIdleTimeout')) * 1000,
    evict: Number(getEnv('sequelizePoolIdleTimeout')) * 1000,
    acquire: Number(getEnv('sequelizePoolAcquireInterval')) * 1000,
  },
  host: getEnv('sequelizeDbHost'),
  port: Number(getEnv('sequelizeDbPort')),
  database: getEnv('sequelizeDbName'),
  username: getEnv('sequelizeDbUser'),
  password: getEnv('sequelizeDbPassword'),
};

export const sequelizeInstance = new Sequelize(SEQUELIZE_CONFIG);

export default () => {
  sequelizeInstance
    .authenticate()
    .then(() => {
      console.info(`Sequelize(${getEnv('sequelizeDialect')}) Connected....`);
    })
    .catch((err) => {
      console.error(err);
    });

  process.on('SIGINT', async () => {
    try {
      await sequelizeInstance.close();
      console.warn(`Sequelize(${getEnv('sequelizeDialect')}) connection is disconnected due to app termination...`);
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
};
