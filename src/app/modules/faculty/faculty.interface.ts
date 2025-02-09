import { Types } from 'mongoose';
import { TUserName } from '../../interface/userName';
import { TGender } from '../../interface/gender';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  designation: string;
  gender: TGender;
  dateOfBirth: Date;
  contactNo: string;
  emergencyContactNo: string;
  email: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
