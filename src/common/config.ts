import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  DB_STR: process.env.DB,
  JWT_SECRET_KEY: 'secret',
};
