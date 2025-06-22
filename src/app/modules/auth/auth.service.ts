import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import { TChangePassowrd, TLoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcryt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { sendMail } from '../../utils/sentMail';

const loginUser = async (payload: TLoginUser) => {
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
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized person');
  }

  const decoded = verifyToken(
    authorizationToken,
    config.jwtRefreshSecret as string,
  );
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

const forgotPassword = async (userId: string) => {
  const user = await User.isUserExistByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found');
  }

  if (user.staus === 'block') {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The user is block');
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The user is deleted');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwtAcceessSecret as string,
    '5m',
  );

  const resetLink = `${config.ui_url}?id=${user.id}&token=${resetToken}`;
  sendMail(user.email, resetLink);
};

const resetPassword = async (
  id: string,
  newPassword: string,
  token: string,
) => {
  const user = await User.isUserExistByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found');
  }

  if (user.staus === 'block') {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The user is block');
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The user is deleted');
  }

  const decoded = verifyToken(token, config.jwtAcceessSecret as string);

  if (id !== decoded.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'User id not matched');
  }

  const newHasPassowrd = await bcryt.hash(
    newPassword,
    Number(config.bcryptSaltRound),
  );

  await User.findOneAndUpdate(
    { id, role: decoded.role },
    { password: newHasPassowrd, passwordChangeAt: new Date() },
  );

  return {};
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
