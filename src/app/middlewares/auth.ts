import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredUserRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Your are unauthorized person',
      );
    }

    const securedToken = config.jwtAcceessSecret as string;

    const decoded = jwt.verify(authorizationToken, securedToken) as JwtPayload;
    if (!decoded) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid token');
    }

    const { id, role, iat} = decoded;

    const isUserExist = await User.isUserExistByCustomId(id);

    const { staus, isDeleted, passwordChangeAt } = isUserExist;

    if (requiredUserRoles && !requiredUserRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    if (!isUserExist) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The person is not a user');
    }

    if (staus === 'block') {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The user is block');
    }
    if (isDeleted) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The user is deleted');
    }

    if (
      passwordChangeAt &&
      (await User.isJwtIssueBeforePasswordChange(passwordChangeAt, iat))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Password already changed');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
