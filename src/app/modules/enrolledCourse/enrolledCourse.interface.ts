import { Types } from 'mongoose';
export type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  final: number;
};

export type TLetterGrade = 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';
export type TEnrolledCourse = {
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicSemester: Types.ObjectId;
  registeredSemester: Types.ObjectId;
  course: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  faculty: Types.ObjectId;
  student: Types.ObjectId;
  courseMarks: TCourseMarks;
  gradePoint: number;
  letterGrade: TLetterGrade;
  isEnrolled: boolean;
  isCompleted: boolean;
};
