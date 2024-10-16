import { model, Schema } from 'mongoose';
import { TDepartment } from './department.interface';

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
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
);

export const Department = model<TDepartment>('departments', departmentSchema);
