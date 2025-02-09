import { z } from 'zod';

const createSemesterRegistrationValidationSchema = z.object({
  academicSemester: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number(),
  status: z.enum(['Upcomming', 'Ongoing', 'Ended']).optional(),
});

const updateSemesterValidationSchema = z.object({
  academicSemester: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minCredit: z.number().optional(),
  maxCredit: z.number().optional(),
  status: z.enum(['Upcomming', 'Ongoing', 'Ended']).optional().optional(),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterValidationSchema,
};
