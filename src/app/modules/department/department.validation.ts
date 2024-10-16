import { z } from 'zod';

const createDepartmentValidation = z.object({
  name: z.string({
    invalid_type_error: 'The department name must be string',
    required_error: 'Department name is required',
  }),
  faculty: z.string({ required_error: 'Faculty is required' }),
});

const updateDepartmentValidation = z.object({
  name: z
    .string({ invalid_type_error: 'The department name must be string' })
    .optional(),
  FacultyValidations: z.string().optional(),
});

export const DepartmentValidations = {
  createDepartmentValidation,
  updateDepartmentValidation,
};
