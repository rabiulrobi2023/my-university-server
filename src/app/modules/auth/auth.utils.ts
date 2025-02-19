import jwt, { JwtPayload } from 'jsonwebtoken';
import { TJwtPayload } from './auth.interface';

export const createToken = (
  payLoad: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payLoad, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
