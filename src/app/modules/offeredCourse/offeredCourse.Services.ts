import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { Department } from '../department/department.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import hasCoflictClassSchedule from './offeredCourse.utils';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';

const createOfferedCorseIntoDB = async (payload: TOfferedCourse) => {
  const {
    academicFaculty,
    academicDepartment,
    registeredSemester,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  const isAcademicDepartmentBelongAcademicFaculty = await Department.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isAcademicDepartmentBelongAcademicFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The department is not belong to the academic faculty`,
    );
  }

  const isSameSectionInSameRegisterdCourseInSameCourse =
    await OfferedCourse.findOne({
      academicDepartment,
      registeredSemester,
      course,
      section,
    });
  if (isSameSectionInSameRegisterdCourseInSameCourse) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Section is duplicated');
  }

  const assignShedule = await OfferedCourse.find({
    registeredSemester,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = { days, startTime, endTime };
  if (hasCoflictClassSchedule(assignShedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Faculty is not available in this schedule',
    );
  }

  const result = await OfferedCourse.create(payload);
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    'faculty' | 'maxCapacity' | 'days' | 'startTime' | 'endTime'
  >,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The offered course that you want to update is not found',
    );
  }

  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  const registeredSemester = isOfferedCourseExist.registeredSemester;

  const registeredSemesterStatus =
    await SemesterRegistration.findById(registeredSemester);
  if (registeredSemesterStatus?.status !== 'Upcomming') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not update this offered course',
    );
  }

  const assignShedule = await OfferedCourse.find({
    registeredSemester,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = { days, startTime, endTime };
  if (hasCoflictClassSchedule(assignShedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Faculty is not available in this schedule',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

export const OfferedCourseSevieces = {
  createOfferedCorseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
