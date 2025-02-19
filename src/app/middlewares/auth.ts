import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import httpStatus from 'http-status';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredUserRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Your are unauthorized person',
      );
    }

    const decoded = jwt.verify(
      authorizationToken,
      config.jwtAcceessSecret as string,
    ) as JwtPayload;

    if (!decoded) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid token');
    }

    const { id, role, iat } = decoded;

    const isUserExist = await User.isUserExistByCustomId(id);

    if (!isUserExist) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The person is not a user');
    }

    const { staus, isDeleted, passwordChangeAt } = isUserExist;

    if (requiredUserRoles && !requiredUserRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    if (staus === 'block') {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The user is block');
    }
    if (isDeleted) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The user is deleted');
    }

    if (
      passwordChangeAt &&
      (await User.isJwtIssueBeforePasswordChange(
        passwordChangeAt,
        iat as number,
      ))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Password already changed');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
