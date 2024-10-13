import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.Interface';
import {
  academicSemesterCode,
  academicSemeterName,
  monthEnum,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemeterName,
      required: [true, 'Academic semester is required'],
    },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: monthEnum,
      required: true,
    },

    endMonth: {
      type: String,
      enum: monthEnum,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<TAcademicSemester>(
  'academic-Semesters',
  academicSemesterSchema,
);