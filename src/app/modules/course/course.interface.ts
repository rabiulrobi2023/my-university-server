import { Types } from 'mongoose';

export type TPreRequisitCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisitCourse?: TPreRequisitCourse[];
  isDeleted: boolean;
};

export type TCourseFaculty = {
  course: Types.ObjectId;
  faculties: Types.ObjectId[];
};
