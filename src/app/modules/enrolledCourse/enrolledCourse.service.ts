/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { Student } from '../student/student.model';
import { EnrolledCourse } from './enrolledCourse.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { gpLgGenerator } from './enrolledCourse.utils';

const createEnrolledCourseIntoDB = async (
  studentId: string,
  payload: TEnrolledCourse,
) => {
  const isExistOfferedCourse = await OfferedCourse.findById(payload);

  if (!isExistOfferedCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found');
  }

  const student = await Student.findOne({ id: studentId }, { _id: 1 });

  const isAlreadyEnrolled = await EnrolledCourse.findOne({
    registeredSemester: isExistOfferedCourse.registeredSemester,
    offeredCourse: isExistOfferedCourse._id,
    student: student?._id,
  });

  if (isAlreadyEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      'The offered course already enrolled',
    );
  }

  if (isExistOfferedCourse.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Unavailable set');
  }

  const alreadyEnrolledCourseCredit = await EnrolledCourse.aggregate([
    {
      $match: {
        registeredSemester: isExistOfferedCourse.registeredSemester,
        student: student?._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourse',
      },
    },
    {
      $unwind: '$enrolledCourse',
    },
    {
      $group: {
        _id: null,
        alreadyEnrolledCredit: { $sum: '$enrolledCourse.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        alreadyEnrolledCredit: 1,
      },
    },
  ]);

  const newEnrollCredit = await Course.findOne(
    { _id: isExistOfferedCourse.course },
    { credits: 1, _id: 0 },
  );

  const totalEnrolledCredit =
    (alreadyEnrolledCourseCredit.length > 0
      ? alreadyEnrolledCourseCredit[0].alreadyEnrolledCredit
      : 0) + newEnrollCredit?.credits;

  const maxCredit = await SemesterRegistration.findOne(
    {
      _id: isExistOfferedCourse?.registeredSemester,
    },
    { maxCredit: 1, _id: 0 },
  );

  if (maxCredit && totalEnrolledCredit > maxCredit?.maxCredit) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Maximum credit must be ${maxCredit?.maxCredit}, but your total credit is ${totalEnrolledCredit}`,
    );
  }

  const newEnrolledCoruseData = {
    academicFaculty: isExistOfferedCourse?.academicFaculty,
    academicDepartment: isExistOfferedCourse?.academicDepartment,
    academicSemester: isExistOfferedCourse.academicSemester,
    registeredSemester: isExistOfferedCourse.registeredSemester,
    course: isExistOfferedCourse.course,
    offeredCourse: isExistOfferedCourse._id,
    faculty: isExistOfferedCourse.faculty,
    student: student?._id,
    isEnrolled: true,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create([newEnrolledCoruseData], {
      session,
    });
    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to enrolled course');
    }

    const maxCapacity = isExistOfferedCourse?.maxCapacity - 1;

    await OfferedCourse.findByIdAndUpdate(isExistOfferedCourse._id, {
      maxCapacity,
    });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

const updateEnrolledCourseMarks = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { registeredSemester, offeredCourse, student, courseMarks } = payload;

  const isEnrolledCourseExist = await EnrolledCourse.findOne({
    registeredSemester,
    offeredCourse,
    student,
  });

  if (!isEnrolledCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The enrolled course not found');
  }

  const faculty = await Faculty.findById(isEnrolledCourseExist.faculty);

  if (facultyId !== faculty?.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The faculty is unathorized');
  }

  const isRegisteredSemesterExist =
    await SemesterRegistration.findById(registeredSemester);

  if (!isRegisteredSemesterExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Semester is not available');
  }

  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Offered course not available');
  }

  const isStudentExist = await Student.findById(student);
  if (!isStudentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not found');
  }

  const modifiedCourseMarksAndLgGpAndStatus: Record<string, unknown> = {};

  if (courseMarks && Object.keys(courseMarks).length > 0) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedCourseMarksAndLgGpAndStatus[`courseMarks.${key}`] = value;
    }
  }

  if (courseMarks?.final) {
    const { classTest1, classTest2, midTerm } =
      isEnrolledCourseExist.courseMarks;
    const finalMarks = courseMarks.final;
    const totalMarks = classTest1 + classTest2 + midTerm + finalMarks;
    const lgGp = gpLgGenerator(finalMarks, totalMarks);

    modifiedCourseMarksAndLgGpAndStatus.gradePoint = lgGp.GP;
    modifiedCourseMarksAndLgGpAndStatus.letterGrade = lgGp.LG;

    if (lgGp.GP === 0) {
      modifiedCourseMarksAndLgGpAndStatus.isCompleted = false;
    } else {
      modifiedCourseMarksAndLgGpAndStatus.isCompleted = true;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isEnrolledCourseExist._id,
    modifiedCourseMarksAndLgGpAndStatus,
    { new: true },
  );
  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarks,
};
