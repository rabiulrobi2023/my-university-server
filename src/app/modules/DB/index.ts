
import config from '../../config';
import { userRoles } from '../user/user.constant';
import { User } from '../user/user.model';

const superAdmin = {
  id: '0001',
  email: 'super-admin@gmail.com',
  password: config.superAdminPassword,
  needPasswordChange: false,
  role: userRoles.superAdmin,
  staus: 'inProgress',
  isDeleted: false,
};

const seedSupierAdmin = async () => {
  const isExistSuperAdmin = await User.findOne({ role: userRoles.superAdmin });
  if (!isExistSuperAdmin) {
    await User.create(superAdmin);
  }
};

export default seedSupierAdmin;
