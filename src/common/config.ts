import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  DB_STR: 'postgres://qcbvchlu:ArPbyyQ6iaYEN02R6pZOzZAViqtSHAqU@fanny.db.elephantsql.com/qcbvchlu',
};
