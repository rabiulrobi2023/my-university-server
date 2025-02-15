import { z } from "zod";

export const userNameValidation = z.object({
  firstName: z
    .string()
    .max(10, { message: 'Name must be maximum 10 character log' }),
  middleName: z.string(),
  lastName: z.string(),
});