import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

export const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const guardianSchema = new Schema<TGuardian>({
  fathersName: { type: String, required: true },
  fathersOccupation: { type: String, required: true },
  fathersContactNo: { type: String, required: true },
  mothersName: { type: String, required: true },
  mothersOccupation: { type: String, required: true },
  mothersContactNo: { type: String, required: true },
});

export const localGuardianSchema = new Schema<TLocalGuardian>({
  loacalGuardianName: { type: String, required: true },
  localGuardianAddress: { type: String, required: true },
  localGuardianContactNo: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>({
  id: { type: String, required: true },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
    required: true,
  },
  dateOfBirth: { type: Date, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String },
  status: {
    type: String,
    enum: ['active', 'inActive'],
    required: true,
  },
  isDeleted: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const Student = model<TStudent>('student', studentSchema);
