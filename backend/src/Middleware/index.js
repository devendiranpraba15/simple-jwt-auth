import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import compression from 'compression';
import passportConfig from './passportConfig';
import { CORS_CONFIG } from '../Config';

const appMiddleware = express();
appMiddleware.use(helmet());
appMiddleware.use(morgan('dev'));
appMiddleware.use(cors(CORS_CONFIG));
appMiddleware.use(function (req, res, next) {
  if (req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  next();
});
passportConfig; // Call passportConfig to set up the passport strategies
appMiddleware.use(passport.initialize());
appMiddleware.use(express.urlencoded({ extended: true, limit: '10mb' }));
appMiddleware.use(express.json({ limit: '5mb' }));
appMiddleware.use(compression());

export default appMiddleware;
