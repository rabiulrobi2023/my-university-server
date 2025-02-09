import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisitCourse,
} from './course.interface';

const preRequisitCourseSchema = new Schema<TPreRequisitCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'courses',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  credits: { type: Number, required: true, trim: true },
  preRequisitCourse: [preRequisitCourseSchema],
  isDeleted: Boolean,
});

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'courses',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'faculties',
    },
  ],
});

export const Course = model<TCourse>('courses', courseSchema);
export const CourseFaculty = model<TCourseFaculty>(
  'course-faculties',
  courseFacultySchema,
);
