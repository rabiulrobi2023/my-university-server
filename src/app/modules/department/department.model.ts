import { model, Schema } from 'mongoose';
import { TDepartment } from './department.interface';
import { Faculty } from '../faculty/faculty.molel';
import httpStatus from 'http-status';
import AppError from '../../error/appError';

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Department name is required'],
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Faculty,
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
    throw new AppError(httpStatus.NOT_FOUND, 'Department is already exists');
  }
  next();
});

export const Department = model<TDepartment>('departments', departmentSchema);
