import { Types } from "mongoose";


export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fathersName: string;
  fathersOccupation: string;
  fathersContactNo: string;
  mothersName: string;
  mothersOccupation: string;
  mothersContactNo: string;
};

export type TLocalGuardian = {
  loacalGuardianName: string;
  localGuardianAddress: string;
  localGuardianContactNo: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId,
  name: TUserName;
  gender: 'Male' | 'Female' | 'Others';
  dateOfBirth: Date;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester:Types.ObjectId
  profileImage?: string;
  isDeleted: boolean;
};
