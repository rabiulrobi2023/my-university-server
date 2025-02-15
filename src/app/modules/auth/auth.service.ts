import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

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
  const user = await User.isUserExistByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Account not found');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The account is deleted');
  }

  if (user.staus === 'block') {
    throw new AppError(httpStatus.FORBIDDEN, 'The account is blocked');
  }

  if (!(await User.isPassowrdMatched(payload.id, payload.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong password');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwtAcceessToken as string, {
    expiresIn: '5d',
  });

  return {
    accessToken,
    needPasswordChange: user?.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
