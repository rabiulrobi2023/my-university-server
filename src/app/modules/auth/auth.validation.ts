import { z } from 'zod';

const loginUserValidation = z.object({
  id: z.string(),
  password: z.string(),
});

const changePasswordValidation = z.object({
  oldPassword: z.string({ required_error: 'Old password is required' }),
  newPassword: z.string({ required_error: 'New password is required' }),
});

export const AuthValidation = {
  loginUserValidation,
  changePasswordValidation
};
