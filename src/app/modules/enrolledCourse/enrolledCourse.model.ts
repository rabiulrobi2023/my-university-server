import { model, Schema } from 'mongoose';
import { TCourseMarks, TEnrolledCourse } from './enrolledCourse.interface';
import { letterGrade } from './enrolledCourse.constant';

const courseMarksSchema = new Schema<TCourseMarks>({
  classTest1: {
    type: Number,
    max: [10, 'Maximum number must be 10'],
    default: 0,
  },
  midTerm: {
    type: Number,
    max: 30,
    default: 0,
  },
  classTest2: {
    type: Number,
    max: 10,
    default: 0,
  },
  final: {
    type: Number,
    max: 50,
    default: 0,
  },
});
const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'academic-faculties',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'departments',
  },
  registeredSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'semester-registrations',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'academic-semesters',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'courses',
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'offerd-courses',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'faculties',
  },
  student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'student',
  },
  courseMarks: {
    type: courseMarksSchema,
    default: {},
  },
  gradePoint: {
    type: Number,
    default: 0,
  },
  letterGrade: {
    type: String,
    enum: letterGrade,
    default: 'NA',
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const EnrolledCourse = model<TEnrolledCourse>(
  'enrolled-courses',
  enrolledCourseSchema,
);
