import { z } from 'zod';

const createFacultyValidationSchema = z.object({
  name: z.string(),
});

export const FacultyValidations = {
  createFacultyValidationSchema,
};
