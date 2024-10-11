import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .min(6, { message: 'Password should be minimum 6 character' })
    .max(20),
});

export const userValidation ={userValidationSchema} ;
