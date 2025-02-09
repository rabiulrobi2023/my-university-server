import { model, Schema } from 'mongoose';
import { TFaculty } from './faculty.interface';
import { User } from '../user/user.model';
import { userNameSchema } from '../../schema/userNameSchema';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.molel';
import { Department } from '../department/department.model';

const facultyMolelSchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, 'Faculty id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      trim: true,
      ref: User,
    },
    name: userNameSchema,
    designation: {
      type: String,
      required: [true, 'Faculty designation is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Others'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact no is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact no is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    profileImage: {
      type: String,
      required: false,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: [true, 'Academic faculty id is required'],
      ref: AcademicFaculty,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: [true, 'Academic department is required'],
      ref: Department,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>('faculties', facultyMolelSchema);
