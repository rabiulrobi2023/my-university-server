import { UserServices } from './user.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const userPass = req.body.password;
  const studentData = req.body.student;
  const result = await UserServices.createStudentIntoDB(userPass, studentData);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student Createtion Successfull',
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


export const userController = {
  createUser,createFaculty
};

