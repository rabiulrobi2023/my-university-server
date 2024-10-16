import { z } from 'zod';

export const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(10, { message: 'Name must be maximum 10 character log' }),
  middleName: z.string(),
  lastName: z.string(),
});

export const guardianValidationSchema = z.object({
  fathersName: z.string(),
  fathersOccupation: z.string(),
  fathersContactNo: z.string(),
  mothersName: z.string(),
  mothersOccupation: z.string(),
  mothersContactNo: z.string(),
});

export const localGuardianValidationSchema = z.object({
  loacalGuardianName: z.string(),
  localGuardianAddress: z.string(),
  localGuardianContactNo: z.string(),
});

export const createStudentValidationSchema = z.object({
  password: z.string().max(20, 'Password minimum 6 digit long').optional(),
  student: z.object({
    name: studentNameValidationSchema,
    gender: z.enum(['Male', 'Female', 'Others']),
    dateOfBirth: z.string().transform((val) => new Date(val)),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImage: z.string().optional(),
    admissionSemester: z.string(),
  }),
});

export const StudentsValidtions = {
  createStudentValidationSchema,
};
