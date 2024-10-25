import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import { User } from '../user/user.model';
import { Department } from '../department/department.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import AppError from '../../error/appError';
import httpStatus from 'http-status';

//=========================User/Student Name Schema=====================================
export const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    maxlength: [10, 'First name should be within 10 character'],
    required: [true, 'First name is required'],
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [10, 'Mid name should be within 10 character'],
    required: [true, 'Middle name is required'],
  },
  lastName: {
    type: String,
    maxlength: [10, 'Last name should be within 10 character'],
    required: [true, 'Last name is required'],
  },
});

//=========================Guardian Schema=====================================
export const guardianSchema = new Schema<TGuardian>({
  fathersName: { type: String, required: [true, 'First name is required'] },
  fathersOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fathersContactNo: {
    type: String,
    required: [true, "Father's contact no is required"],
  },
  mothersName: { type: String, required: [true, "Mother's Name is required"] },
  mothersOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  mothersContactNo: {
    type: String,
    required: [true, "Mother's contact no is required"],
  },
});

//=========================Local Guardian  Schema=====================================
export const localGuardianSchema = new Schema<TLocalGuardian>({
  loacalGuardianName: {
    type: String,
    required: [true, 'Local guardian is required'],
  },
  localGuardianAddress: {
    type: String,
    required: [true, 'Local guardian adddress is required'],
  },
  localGuardianContactNo: {
    type: String,
    required: [true, 'Contact no of local guardian is required'],
  },
});

//=========================MainSchema=====================================
const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      // trim: true,
      // maxlength: [6, 'ID should be maximum length 6'],
      // minlength: [6, 'ID should be minimum length 6'],
      // required: [true, 'ID is required'],
      // unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is must be required'],
      unique: true,
      ref: User,
    },

    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Others'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date, required: [true, 'DOB is required'] },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact no is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact no is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: { type: guardianSchema, required: true },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImage: { type: String },
    isDeleted: { type: Boolean, default: false },
    academicDepartment: {
      type: Schema.ObjectId,
      ref: Department,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: AcademicSemester,
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isStudentExists = await Student.findOne(query);

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exists');
  } else {
    next();
  }
  // next();
});

export const Student = model<TStudent>('student', studentSchema);
