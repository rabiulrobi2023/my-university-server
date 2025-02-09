import { z } from 'zod';

const createDepartmentValidation = z.object({
  name: z.string({
    invalid_type_error: 'The department name must be string',
    required_error: 'Department name is required',
  }),
  academicFaculty: z.string({ required_error: 'academicFaculty is required' }),
});

const updateDepartmentValidation = z.object({
  name: z
    .string({ invalid_type_error: 'The department name must be string' })
    .optional(),
  academicFaculty: z.string().optional(),
});

export const DepartmentValidations = {
  createDepartmentValidation,
  updateDepartmentValidation,
};
