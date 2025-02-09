import { Types } from 'mongoose';
import { TUserName } from '../../interface/userName';
import { TGuardian } from '../../interface/guardian';
import { TLocalGuardian } from '../../interface/localGuardian';
import { TBloodGroup } from '../../interface/bloodGroup.interface';
import { TGender } from '../../interface/gender';

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: TGender;
  dateOfBirth: Date;
  bloodGroup: TBloodGroup;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
  admissionSemester: Types.ObjectId;
};
