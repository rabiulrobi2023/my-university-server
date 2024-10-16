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

departmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExistDepartment = await Department.findOne(query);
  if (!isExistDepartment) {
    throw new Error("This department doesn't exist");
  }
  next();
});

departmentSchema.pre('save', async function (next) {
  const isExistsDepartment = await Department.findOne({ name: this.name });
  if (isExistsDepartment) {
    throw new Error('Department is already exists');
  }
  next();
});

export const Department = model<TDepartment>('departments', departmentSchema);
