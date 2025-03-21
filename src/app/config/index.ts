import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  defaultPass: process.env.DEFAULT_PASS,
  bcryptSaltRound: process.env.BCRYPT_SALTROUND,
  jwtAcceessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpireIn: process.env.JWT_ACCESS_EXPIREIN,
  jwtRefreshSecret: process.env.JWT_REFRESS_SECRET,
  jwtRefreshExpireIn: process.env.JWT_REFRESS_EXPIREIN,
  ui_url: process.env.UI_URL,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  superAdminPassword: process.env.SUPER_ADMIN_PASS
};
