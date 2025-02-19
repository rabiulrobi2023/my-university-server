/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';
import { userRoles } from './user.constant';

export interface IUser {
  id: string;
  email: string;
  password: string;
  passwordChangeAt?: Date;
  needPasswordChange: boolean;
  role: 'admin' | 'faculty' | 'student';
  staus: 'inProgress' | 'block';
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistByCustomId(id: string): Promise<IUser>;
  isPassowrdMatched(id: string, plainPassword: string): Promise<boolean>;
  isJwtIssueBeforePasswordChange(
    passwordChangeAt: Date,
    JwtIssueAt: number,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof userRoles;
