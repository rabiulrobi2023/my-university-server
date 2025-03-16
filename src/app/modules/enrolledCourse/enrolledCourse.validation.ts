import { z } from 'zod';

const enrolledCourseValidation = z.object({
  offeredCourse: z.string({ message: 'Offered course is required' }),
});

const updateEnrolledCourseMarksValidationSchema = z.object({
  registeredSemester: z.string({ message: 'Registered semester is required' }),
  offeredCourse: z.string({ message: 'Offered course is required' }),
  student: z.string({ message: 'Student id is required' }),
  courseMarks: z.object({
    classTest1: z.number().max(10, { message: 'Maximum number must be 10' }).optional(),
    midTerm: z.number().max(30, { message: 'Maximum number must be 30' }).optional(),
    classTest2: z.number().max(10, { message: 'Maximum number must be 10' }).optional(),
    final: z.number().max(50, { message: 'Maximum number must be 50' }).optional(),
  }),
});

export const EnrolledCourseValidation = {
  enrolledCourseValidation,
  updateEnrolledCourseMarksValidationSchema
};
