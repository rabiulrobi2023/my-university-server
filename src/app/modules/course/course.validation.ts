import { z } from 'zod';

const createPreRequisitCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const createCourseValidationSchema = z.object({
  title: z.string(),
  prefix: z.string(),
  code: z.number(),
  credits: z.number(),
  preRequisitCourse: z
    .array(createPreRequisitCourseValidationSchema)
    .optional(),
  isDeleted: z.boolean().optional(),
});

const updatePreRequisitCourseValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  title: z.string().optional(),
  prefix: z.string().optional(),
  code: z.number().optional(),
  credits: z.number().optional(),
  preRequisitCourse: z
    .array(updatePreRequisitCourseValidationSchema)
    .optional(),
  isDeleted: z.boolean().optional(),
});

const courseFacultyValidationSchema = z.object({
  faculties: z.array(z.string()),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  courseFacultyValidationSchema,
};
