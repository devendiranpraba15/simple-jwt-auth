export const CORS_CONFIG = {
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  headers: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Cookie',
    'Authorization',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
  ],
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:5000'],
};
