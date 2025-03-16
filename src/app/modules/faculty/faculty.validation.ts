import { z } from 'zod';

export const createFacultyNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name must be maximun 20 character long '),
  middleName: z
    .string()
    .max(20, 'Middle name must be maximun 20 character long '),
  lastName: z.string().max(20, 'Last name must be maximun 20 character long '),
});
const createFacultyValidationSchema = z.object({
  password: z
    .string()
    .max(20)
    .min(6, 'Password must be minimum 6 digit logn')
    .optional(),
  faculty: z.object({
    name: createFacultyNameValidationSchema,
    designation: z.string(),
    gender: z.enum(['Male', 'Female', 'Others']),
    dateOfBirth: z.string().transform((val) => new Date(val)),
    contactNo: z.string().max(11).min(11),
    emergencyContactNo: z.string().max(11).min(11),
    email: z.string().email(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImage: z.string().optional(),
    academicDepartment: z.string(),
  }),
});

export const updateFacultyNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name must be maximun 20 character long ')
    .optional(),
  middleName: z
    .string()
    .max(20, 'Middle name must be maximun 20 character long ')
    .optional(),
  lastName: z
    .string()
    .max(20, 'Last name must be maximun 20 character long ')
    .optional(),
});

const updateFacultyValidatinSchema = z.object({
  name: updateFacultyNameValidationSchema,
  designation: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Others']).optional(),
  dateOfBirth: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  contactNo: z.string().max(11).min(11).optional(),
  emergencyContactNo: z.string().max(11).min(11).optional(),
  email: z.string().email().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  profileImage: z.string().optional().optional(),
  academicFaculty: z.string().optional(),
  academicDepartment: z.string().optional(),
});

export const FacultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidatinSchema,
};
