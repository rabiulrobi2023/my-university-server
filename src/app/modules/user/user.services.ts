/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { studentIdGenerator } from './user.utils';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.Interface';
import { facultyIdGenerator } from '../faculty/faculty.utils';

const createStudentIntoDB = async (pass: string, studentData: TStudent) => {
  const admissionSemesterData = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const studentId = (
      await studentIdGenerator(admissionSemesterData as TAcademicSemester)
    ).toString();

    const userData: Partial<TUser> = {
      id: studentId,
      password: pass || (config.defaultPass as string),
      role: 'student',
    };

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new err();
  }
};

const createFacultyIntoDB = async (pass: string, facultyData: TFaculty) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const facultyId = await facultyIdGenerator();
    const userData: Partial<TUser> = {
      id: facultyId,
      password: pass || config.defaultPass,
      role: 'faculty',
    };

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to create faculty');
    }
    facultyData.user = newUser[0]?._id;
    facultyData.id = newUser[0]?.id;

    const newFaculty = await Faculty.create([facultyData], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
