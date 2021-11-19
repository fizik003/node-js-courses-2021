import config from './common/config';
import { sequelize } from './common/db';
import { app } from './app';
import { User } from './models/user.model';
import { Group, IGroupReq, Permission } from './models/group.model';
import { UserGroup } from './models/userGroup.model';

const { PORT } = config;

try {
  app.listen(PORT, async () => {
    console.log(`App is running on http://localhost:${PORT}`);

    await sequelize.sync();
    // await UserGroup.drop();
    // await User.drop();
    // await Group.drop();
    console.log('Connection to DB has been established successfully.');
    // await User.create({
    //   login: '123',
    //   age: 12,
    //   password: '1234r',
    // });
    // User.findByPk('a9f90bc0-4913-11ec-9a63-9173cb371b32', {
    //   include: Group,
    // }).then((user) => console.log(user));

    // await Group.create({ name: 'groupName', permission: [Permission.Read] } as IGroupReq);
    // await Group.create({ name: 'group', permission: [Permission.Write] } as IGroupReq);
    // f();
  });
} catch (error) {
  console.error('Something went wrong:', error);
}
async function f() {
  const user = await User.create({ age: 13, login: 'dsdsd', password: 'dwed' });
  const group = await Group.create({ permission: ['READ'], name: 'ddss' });
  const fgf = await UserGroup.create({
    UserId: user.getDataValue('id'),
    GroupId: group.getDataValue('id'),
  });
}
