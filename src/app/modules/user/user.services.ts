/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { User } from './user.model';
import { adminIdGenerator, studentIdGenerator } from './user.utils';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.Interface';
import { facultyIdGenerator } from '../faculty/faculty.utils';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IUser } from './user.interface';
import { userRoles } from './user.constant';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Department } from '../department/department.model';

const createStudentIntoDB = async (
  pass: string,
  studentData: TStudent,
  file: any,
) => {
  const admissionSemesterData = await AcademicSemester.findById(
    studentData.admissionSemester,
  );
  if (!admissionSemesterData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }

  const isDepartmentExist = await Department.findById(
    studentData.academicDepartment,
  );
  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department not found');
  }

  studentData.academicFaculty = isDepartmentExist.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const studentId = (
      await studentIdGenerator(admissionSemesterData as TAcademicSemester)
    ).toString();

    const userData: Partial<IUser> = {
      id: studentId,
      email: studentData.email,
      password: pass || (config.defaultPass as string),
      role: 'student',
    };

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    if (file) {
      const imageName = `Photo_${newUser[0].id}_${studentData?.name.middleName}`;
      const generatProfileImageUrl = (await sendImageToCloudinary(
        file?.path,
        imageName,
      )) as any;
      studentData.profileImage = generatProfileImageUrl.secure_url;
    }

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
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  pass: string,
  adminData: TAdmin,
  file: any,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const admintId = await adminIdGenerator();

    const userData: Partial<IUser> = {
      id: admintId,
      email: adminData.email,
      password: pass || (config.defaultPass as string),
      role: 'admin',
    };

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    adminData.id = newUser[0].id;
    adminData.user = newUser[0]._id;

    if (file) {
      const imageName = `Photo_${newUser[0].id}_${adminData?.name.middleName}`;
      const generatProfileImageUrl = (await sendImageToCloudinary(
        file?.path,
        imageName,
      )) as any;
      adminData.profileImage = generatProfileImageUrl.secure_url;
    }

    const newAdmin = await Admin.create([adminData], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (
  pass: string,
  facultyData: TFaculty,
  file: any,
) => {
  const isDepartmentExist = await Department.findById(
    facultyData.academicDepartment,
  );
  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The department is not found');
  }
  facultyData.academicFaculty = isDepartmentExist.academicFaculty;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const facultyId = await facultyIdGenerator();
    const userData: Partial<IUser> = {
      id: facultyId,
      email: facultyData.email,
      password: pass || config.defaultPass,
      role: 'faculty',
    };

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to create faculty');
    }
    facultyData.user = newUser[0]?._id;
    facultyData.id = newUser[0]?.id;

    if (file) {
      const imageName = `Photo_${newUser[0].id}_${facultyData?.name.middleName}`;
      const generatProfileImageUrl = (await sendImageToCloudinary(
        file?.path,
        imageName,
      )) as any;
      facultyData.profileImage = generatProfileImageUrl.secure_url;
    }

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
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getMeFromDB = async (userId: string, role: string) => {
  let result = null;
  if (role === userRoles.admin) {
    result = await Admin.findOne({ userId }).populate('user');
  }

  if (role === userRoles.faculty) {
    result = await Faculty.findOne({ userId }).populate('user');
  }

  if (role === userRoles.student) {
    result = await Student.findOne({ userId }).populate('user');
  }
  return result;
};

const userStatusChangeIntoDB = async (id: string, payload: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { staus: payload },
    { new: true },
  );
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  getAllUsersFromDB,
  createAdminIntoDB,
  getMeFromDB,
  userStatusChangeIntoDB,
};
