
import { UserServices } from './user.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createStudent = catchAsync(async (req, res) => {
  const userPass = req.body.password;
  const studentData = req.body.student;
  const result = await UserServices.createStudentIntoDB(userPass, studentData);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student Createtion Successfull',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const userPass = req.body.password;
  const adminData = req.body.admin;
  const result = await UserServices.createAdminIntoDB(userPass, adminData);
  sendResponse(res, {
    message: 'Admin created successfull',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const pass = req.body.password;
  const facultyData = req.body.faculty;
  const result = await UserServices.createFacultyIntoDB(pass, facultyData);
  sendResponse(res, {
    message: 'Faculty create successfull',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    message: 'Users retrived successfull',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getAllUsers,
};
