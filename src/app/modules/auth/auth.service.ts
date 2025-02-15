import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import { TChangePassowrd, TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcryt from 'bcrypt';
import { now } from 'mongoose';

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

  const accessToken = jwt.sign(jwtPayload, config.jwtAcceessToken as string, {
    expiresIn: '5d',
  });

  return {
    accessToken,
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

export const AuthServices = {
  loginUser,
  changePassword,
};
