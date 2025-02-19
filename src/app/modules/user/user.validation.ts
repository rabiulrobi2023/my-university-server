import { z } from 'zod';
import { userStatus } from './user.constant';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .min(6, { message: 'Password should be minimum 6 character' })
    .max(20),
});

const userStatusValidation = z.object({
  status: z.enum(userStatus),
});

export const UserValidations = { userValidationSchema, userStatusValidation };
