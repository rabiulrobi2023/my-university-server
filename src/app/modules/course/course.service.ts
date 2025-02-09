import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/appError';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { coruseSearchableField } from './course.utils';
import mongoose from 'mongoose';

const createCourseIntoDB = async (payload: TCourse) => {
  const existCourseTitle = await Course.findOne({ title: payload.title });

  if (existCourseTitle?.title == payload.title) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'The course already exist');
  }

  const existCourseCode = await Course.find({
    prefix: payload.prefix,
    code: payload.code,
  });
  if (existCourseCode.length > 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Course code is already exist!');
  }
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisitCourse.course'),
    query,
  )
    .search(coruseSearchableField)
    .filter()
    .sort()
    .paginate()
    .limit();

  const result = await courseQuery.queryModel;

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisitCourse.course');
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisitCourse, ...remainingCourseData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      { runValidators: true, session, new: true },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to update course');
    }

    if (preRequisitCourse && preRequisitCourse.length > 0) {
      const deletePreRequisitsCoursesId = preRequisitCourse
        ?.filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletePreRequisitCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisitCourse: { course: { $in: deletePreRequisitsCoursesId } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletePreRequisitCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Fail to update course');
      }

      const newPreRequisitCourses = preRequisitCourse?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const addPreRequisitCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisitCourse: { $each: newPreRequisitCourses } },
        },
        { new: true, runValidators: true, session },
      );
      if (!addPreRequisitCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Fail to update course');
      }
    }

    await session.commitTransaction();
    await session.endSession();
    const updatedCourse = await Course.findById(id).populate(
      'preRequisitCourse.courses',
    );
    return updatedCourse;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Fail to update course');
  }
};

const deleteSingleCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultyIntoCourseIntoDB = async (
  course: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    course,
    {
      course: course,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );
  return result;
};

const deleteFacultyFromCourseFromDB = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(courseId, {
    $pull: { faculties: { $in: payload } },
  });
  return result;
};
export const CourseSevices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteSingleCourseFromDB,
  assignFacultyIntoCourseIntoDB,
  deleteFacultyFromCourseFromDB,
};
