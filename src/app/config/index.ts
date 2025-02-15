import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  defaultPass:process.env.DEFAULT_PASS,
  bcryptSaltRound: process.env.BCRYPT_SALTROUND,
  jwtAcceessToken : process.env.JWT_ACCESS_SECRET
};
