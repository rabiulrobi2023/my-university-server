import { model, Schema } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { days } from './offeredCourse.constant';

const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    registeredSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'semester-registrations',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'academic-semesters',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'academic-faculties',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'departments',
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'courses',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'faculties',
    },
    maxCapacity: {
      type: Number,
      required: true,
      trim: true,
    },
    section: {
      type: Number,
      required: true,
      trim: true,
    },
    days: {
      type: String,
      enum: days,
      required: true,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const OfferedCourse = model<TOfferedCourse>(
  'offerd-courses',
  offeredCourseSchema,
);
