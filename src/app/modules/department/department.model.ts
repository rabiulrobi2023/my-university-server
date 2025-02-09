import { model, Schema } from 'mongoose';
import { TDepartment } from './department.interface';

import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.molel';

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Department name is required'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AcademicFaculty,
    },
  },
  {
    timestamps: true,
  },
);

departmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExistDepartment = await Department.findOne(query);
  if (!isExistDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department does not exists');
  }
  next();
});

departmentSchema.pre('save', async function (next) {
  const isExistsDepartment = await Department.findOne({ name: this.name });
  if (isExistsDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Department is already exists!!!!!!',
    );
  }
  next();
});

export const Department = model<TDepartment>('departments', departmentSchema);
