import express from 'express';
import dotenv from 'dotenv';
import sequelizeConnector from '../Utils/DbConnector/sequelize';
import appMiddleware from '../Middleware';
import { getEnv } from '../Utils/envConfig';

dotenv.config({ debug: true, path: './src/_settings.env' });
const app = express();

const PORT = getEnv('apiServerPort');

const handle404 = (req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'Invalid API Endpoint' });
};

const handle500 = (err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong' });
};

const initServer = (handlers) => {
  app.set('serverStarted', false);
  app.set('dbConnected', false);
  app.use(appMiddleware);

  sequelizeConnector((status, msg) => {
    if (status === 'SUCCESS') {
      app.set('dbConnected', true);
    } else app.set('dbConnected', false);
  });

  handlers.forEach((handler) => {
    app.use(handler.path, handler.router);
  });

  try {
    app.use(handle404);
    app.use(handle500);
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT + '...!');
    });
  } catch (e) {
    console.log('Error occurred while starting API server', e);
  }
  app.set('serverStarted', true);

  process.on('SIGINT', () => {
    console.log('SIGINT: Terminating API server...');
    process.exit(1);
  });
  app.on('close', () => {
    console.log('Server has closed');
  });

  return app;
};

export default initServer;
