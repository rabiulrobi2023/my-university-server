import { z } from 'zod';
import { days } from './offeredCourse.constant';

const timeValidationSchema = z.string().refine(
  (time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  { message: 'Invalid time format, time format must be HH:MM for 24 hours' },
);

const createOfferedCourseValidtaion = z
  .object({
    registeredSemester: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.enum(days).array(),
    startTime: timeValidationSchema,
    endTime: timeValidationSchema,
  })
  .refine(
    (x) => {
      const start = new Date(`1970-01-01T${x.startTime}`);
      const end = new Date(`1970-01-01T${x.endTime}`);
      return end > start;
    },
    { message: 'End time must be greater than start time' },
  );

const updateOfferedCourseValidation = z
  .object({
    faculty: z.string(),
    maxCapacity: z.number().optional(),
    days: z.enum(days).array(),
    startTime: timeValidationSchema,
    endTime: timeValidationSchema,
  })
  .refine(
    (x) => {
      const start = new Date(`1970-01-01T${x.startTime}`);
      const end = new Date(`1970-01-01T${x.endTime}`);
      return end > start;
    },
    { message: 'End time must be greater than start time' },
  );

export const OfferedCourseValidations = {
  createOfferedCourseValidtaion,
  updateOfferedCourseValidation,
};
