
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.loginUser(userData);
  sendResponse(res, {
    message: 'User login successfull',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const passwords = req.body;
  const result = await AuthServices.changePassword(user, passwords);
  sendResponse(res, {
    message: 'Password change successfull',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
};
