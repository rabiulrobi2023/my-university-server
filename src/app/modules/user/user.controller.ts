import { userService } from './user.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const userPass = req.body.password;
  const studentData = req.body.student;
  const result = await userService.createStudentIntoDB(userPass, studentData);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student Createtion Successfull',
    data: result,
  });
});

export const userController = {
  createUser,
};
