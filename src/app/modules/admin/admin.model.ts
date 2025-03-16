import { Schema, model } from 'mongoose';
import { User } from '../user/user.model';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import { userNameSchema } from '../../schema/userNameSchema';
import { TAdmin } from './admin.interface';

//=========================MainSchema=====================================
const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is must be required'],
      unique: true,
      ref: User,
    },
    name: userNameSchema,
    designation: { type: String, required: [true, 'Designation is required'] },
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
    profileImage: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

adminSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isAdminExists = await Admin.findOne(query);

  if (!isAdminExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin does not exists');
  } else {
    next();
  }
});

export const Admin = model<TAdmin>('admin', adminSchema);
