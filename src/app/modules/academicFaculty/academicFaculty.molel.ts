import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';


const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, 'Academic Faculty Name is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<TAcademicFaculty>(
  'academic-faculties',
  academicFacultySchema,
);
