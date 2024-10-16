import { model, Schema } from 'mongoose';
import { TFaculty } from './faculty.interface';

const facultySchema = new Schema<TFaculty>(
  {
    name: {
      type: String,
      required: [true, 'Faculty Name is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>('faculties', facultySchema);
