import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredUserRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Your are unauthorized person',
      );
    }

    jwt.verify(
      authorizationToken,
      config.jwtAcceessToken as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
        }
        const role = (decoded as JwtPayload).role;
        if (requiredUserRoles && !requiredUserRoles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};
export default auth;
