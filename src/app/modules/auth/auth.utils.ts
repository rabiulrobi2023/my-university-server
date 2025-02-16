import jwt from 'jsonwebtoken';
import { TJwtPayload } from './auth.interface';

export const createToken = (
  payLoad: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payLoad, secret, { expiresIn });
};
