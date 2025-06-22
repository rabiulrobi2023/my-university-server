import { z } from 'zod';
import { days } from './offeredCourse.constant';

const timeValidationSchema = z.string().refine(
  (time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  { message: 'Invalid time format, time format must be HH:MM for 24 hours' },
);

const createOfferedCourseValidtaion = z.object({
  registeredSemester: z.string(),
  academicSemester: z.string(),
  academicFaculty: z.string(),
  academicDepartment: z.string(),
  course: z.string(),
  faculty: z.string(),
  maxCapacity: z.number(),
  section: z.number(),
  days: z.array(z.enum(days)),
  startTime: timeValidationSchema,
  endTime: timeValidationSchema,
}).refine(
  (data) => {
    const start = Date.parse(`1970-01-01T${data.startTime}:00Z`);
    const end = Date.parse(`1970-01-01T${data.endTime}:00Z`);
    return end > start;
  },
  {
    message: 'End time must be greater than start time',
    path: ['endTime'],
  }
);


const updateOfferedCourseValidation = z
  .object({
    faculty: z.string(),
    maxCapacity: z.number().optional(),
    days: z.array(z.enum(days)),
    startTime: timeValidationSchema,
    endTime: timeValidationSchema,
  })
  .refine(
    (x) => {
      const start = new Date(`1970-01-01T${x.startTime}:00Z`);
      const end = new Date(`1970-01-01T${x.endTime}:00Z`);
      return end > start;
    },
    { message: 'End time must be greater than start time' },
  );

export const OfferedCourseValidations = {
  createOfferedCourseValidtaion,
  updateOfferedCourseValidation,
};
