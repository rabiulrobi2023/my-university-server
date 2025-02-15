/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';
import { userRole } from './user.constant';

export interface IUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'faculty' | 'student';
  staus: 'inProgress' | 'block';
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistByCustomId(id: string): Promise<IUser>;
  isPassowrdMatched(id: string, plainPassword: string): Promise<boolean>;
}

export type TUserRole = keyof typeof userRole;
