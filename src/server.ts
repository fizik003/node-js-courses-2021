import config from './common/config';
import { sequelize } from './common/db';
import { app } from './app';

const { PORT } = config;

try {
  app.listen(PORT, async () => {
    console.log(`App is running on http://localhost:${PORT}`);

    await sequelize.sync();

    console.log('Connection to DB has been established successfully.');
  });
} catch (error) {
  console.error('Something went wrong:', error);
}
