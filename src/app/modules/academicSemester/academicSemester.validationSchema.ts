import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemeterName,
  monthEnum,
} from './academicSemester.constant';

const createAcademicValidationSchema = z.object({
  body: z.object({
    name: z.enum([...(academicSemeterName as [string, ...string[]])]),
    code: z.enum([...(academicSemesterCode as [string, ...string[]])]),
    year: z.string(),
    startMonth: z.enum([...(monthEnum as [string, ...string[]])]),
    endMonth: z.enum([...(monthEnum as [string, ...string[]])]),
  }),
});
export const AcademicSemeterValidations = {
  createAcademicValidationSchema,
};
