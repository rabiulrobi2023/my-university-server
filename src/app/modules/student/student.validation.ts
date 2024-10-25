import { z } from 'zod';
//===========================Create Validation Schema===============

export const createStudentNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(10, { message: 'Name must be maximum 10 character log' }),
  middleName: z.string(),
  lastName: z.string(),
});

export const createGuardianValidationSchema = z.object({
  fathersName: z.string(),
  fathersOccupation: z.string(),
  fathersContactNo: z.string(),
  mothersName: z.string(),
  mothersOccupation: z.string(),
  mothersContactNo: z.string(),
});

export const createLocalGuardianValidationSchema = z.object({
  loacalGuardianName: z.string(),
  localGuardianAddress: z.string(),
  localGuardianContactNo: z.string(),
});

export const createStudentValidationSchema = z.object({
  password: z.string().max(20, 'Password minimum 6 digit long').optional(),
  student: z.object({
    name: createStudentNameValidationSchema,
    gender: z.enum(['Male', 'Female', 'Others']),
    dateOfBirth: z.string().transform((val) => new Date(val)),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: createGuardianValidationSchema,
    localGuardian: createLocalGuardianValidationSchema,
    profileImage: z.string().optional(),
    academicDepartment: z.string(),
    admissionSemester: z.string(),
  }),
});

//=====================Update Validation Scchma===============
export const updateStudentNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(10, { message: 'Name must be maximum 10 character log' })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateGuardianValidationSchema = z.object({
  fathersName: z.string().optional(),
  fathersOccupation: z.string().optional(),
  fathersContactNo: z.string().optional(),
  mothersName: z.string().optional(),
  mothersOccupation: z.string().optional(),
  mothersContactNo: z.string().optional(),
});

export const updateLocalGuardianValidationSchema = z.object({
  loacalGuardianName: z.string().optional(),
  localGuardianAddress: z.string().optional(),
  localGuardianContactNo: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  password: z.string().max(20, 'Password minimum 6 digit long').optional(),
  student: z.object({
    name: updateStudentNameValidationSchema.optional(),
    gender: z.enum(['Male', 'Female', 'Others']).optional(),
    dateOfBirth: z
      .string()
      .transform((val) => new Date(val))
      .optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: createGuardianValidationSchema.optional(),
    localGuardian: createLocalGuardianValidationSchema.optional(),
    profileImage: z.string().optional().optional(),
    academicDepartment: z.string().optional(),
    admissionSemester: z.string().optional(),
  }),
});

export const StudentsValidtions = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
