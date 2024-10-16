import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemeterName,
  monthEnum,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  name: z.enum([...(academicSemeterName as [string, ...string[]])]),
  code: z.enum([...(academicSemesterCode as [string, ...string[]])]),
  year: z.string(),
  startMonth: z.enum([...(monthEnum as [string, ...string[]])]),
  endMonth: z.enum([...(monthEnum as [string, ...string[]])]),
});

const updateAcademicSemesterValidationSchema = z.object({
  name: z.enum([...(academicSemeterName as [string, ...string[]])]).optional(),
  code: z.enum([...(academicSemesterCode as [string, ...string[]])]).optional(),
  year: z.string().optional(),
  startMonth: z.enum([...(monthEnum as [string, ...string[]])]).optional(),
  endMonth: z.enum([...(monthEnum as [string, ...string[]])]).optional(),
});
export const AcademicSemeterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
