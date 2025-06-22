import jwt from 'jsonwebtoken';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
  payLoad: {
    id: string;
    role: string;
  },
  secret: string,
  expiresIn: string,
) => {
  const options: SignOptions = { expiresIn: Number(expiresIn) };
  return jwt.sign(payLoad, secret, options);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
