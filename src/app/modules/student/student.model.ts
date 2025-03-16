import { Schema, model } from 'mongoose';
import { TStudent } from './student.interface';
import { User } from '../user/user.model';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import { userNameSchema } from '../../schema/userNameSchema';
import { TGuardian } from '../../interface/guardian';
import { TLocalGuardian } from '../../interface/localGuardian';

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
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is must be required'],
      unique: true,
      ref: User,
    },

    name: userNameSchema,
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
      requird: [true, 'Blood group is required'],
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
    profileImage: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
    academicFaculty: {
      type: Schema.ObjectId,
      ref: 'academic-faculties',
    },
    academicDepartment: {
      type: Schema.ObjectId,
      ref: 'departments',
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academic-semesters',
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
});

export const Student = model<TStudent>('student', studentSchema);
