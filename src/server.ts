import config from './common/config';
import { sequelize } from './common/db';
import { app } from './app';
import { User } from './models/user.model';

const { PORT } = config;

try {
  app.listen(PORT, async () => {
    console.log(`App is running on http://localhost:${PORT}`);

    await sequelize.sync();
    // await User.drop();
    console.log('Connection to DB has been established successfully.');
    // await User.create({
    //   login: '123',
    //   age: 12,
    //   password: '1234r',
    // });
  });
} catch (error) {
  console.error('Something went wrong:', error);
}
