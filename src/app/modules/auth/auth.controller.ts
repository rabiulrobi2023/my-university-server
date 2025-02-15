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

export const AuthController = {
  loginUser,
};
