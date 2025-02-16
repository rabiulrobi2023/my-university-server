import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import { TChangePassowrd, TLoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcryt from 'bcrypt';
import { createToken } from './auth.utils';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  // const isUserExist = await User.findOne({ id: payload?.id });

  // if (!isUserExist) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Account not found');
  // }

  // if (isUserExist?.isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'The account is deleted');
  // }

  // if (isUserExist?.staus === 'block') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'The account is blocked');
  // }

  // const checkPassowrd = await bcrypt.compare(
  //   payload?.password,
  //   isUserExist?.password,
  // );
  // if (!checkPassowrd) {
  //   throw new AppError(httpStatus.BAD_REQUEST, 'Wrong password');
  // }
  const isExistUser = await User.isUserExistByCustomId(payload.id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Account not found');
  }

  if (isExistUser.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The account is deleted');
  }

  if (isExistUser.staus === 'block') {
    throw new AppError(httpStatus.FORBIDDEN, 'The account is blocked');
  }

  if (!(await User.isPassowrdMatched(payload.id, payload.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong password');
  }

  const jwtPayload = {
    id: isExistUser.id,
    role: isExistUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtAcceessSecret as string,
    config.jwtAccessExpireIn as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    config.jwtRefreshExpireIn as string,
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: isExistUser?.needPasswordChange,
  };
};

const changePassword = async (user: JwtPayload, payload: TChangePassowrd) => {
  const isExistUser = await User.isUserExistByCustomId(user.id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Account not found');
  }

  if (isExistUser.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The account is deleted');
  }

  if (isExistUser.staus === 'block') {
    throw new AppError(httpStatus.FORBIDDEN, 'The account is blocked');
  }

  if (!(await User.isPassowrdMatched(user.id, payload.oldPassword))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Old password is wrong');
  }

  const newHasPassword = await bcryt.hash(
    payload.newPassword,
    Number(config.bcryptSaltRound),
  );

  await User.findOneAndUpdate(
    { id: isExistUser.id, role: isExistUser.role },
    {
      password: newHasPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (authorizationToken: string) => {
  if (!authorizationToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Your are unauthorized person');
  }

  const securedToken = config.jwtRefreshSecret as string;

  const decoded = jwt.verify(authorizationToken, securedToken) as JwtPayload;
  if (!decoded) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid token');
  }

  const { id, iat } = decoded;

  const isUserExist = await User.isUserExistByCustomId(id);

  const { staus, isDeleted, passwordChangeAt } = isUserExist;

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
    (await User.isJwtIssueBeforePasswordChange(passwordChangeAt, iat as number))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password already changed');
  }

  const jwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtAcceessSecret as string,
    config.jwtAccessExpireIn as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
