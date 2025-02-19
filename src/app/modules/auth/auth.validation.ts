import { z } from 'zod';

const loginUserValidation = z.object({
  id: z.string(),
  password: z.string(),
});

const refreshTokenValidation = z.object({
  refreshToken: z.string({ required_error: 'Refresh token is required' }),
});

const changePasswordValidation = z.object({
  oldPassword: z.string({ required_error: 'Old password is required' }),
  newPassword: z.string({ required_error: 'New password is required' }),
});

const forgotPassowrdValidation = z.object({
  userId: z.string({ message: 'Id is required' }),
});
const resetPasswordValidation = z.object({
  id: z.string({ message: 'Id is required' }),
  newPassword: z.string({ message: 'New password is required' }),
});

export const AuthValidation = {
  loginUserValidation,
  refreshTokenValidation,
  changePasswordValidation,
  forgotPassowrdValidation,
  resetPasswordValidation
};
