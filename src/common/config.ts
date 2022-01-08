import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  DB_STR: process.env.DB,
  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY || 'secret',
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY || 'secret2',
};
