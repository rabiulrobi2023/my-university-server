import { z } from 'zod';

const loginUserValidation = z.object({
  id: z.string(),
  password: z.string(),
});

export const AuthValidation = {
  loginUserValidation,
};
