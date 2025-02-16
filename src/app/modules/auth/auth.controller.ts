import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.loginUser(userData);
  const { accessToken, refreshToken, needPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    message: 'User login successfull',
    data: {
      accessToken,
      refreshToken,
      needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async(req,res)=>{
  const {refreshToken} = req.cookies
  const result = await(AuthServices.refreshToken(refreshToken))
  sendResponse(res,{
    message:"Access token retrive sussessfull",
    data: result
  })
  
})

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
  refreshToken
};
