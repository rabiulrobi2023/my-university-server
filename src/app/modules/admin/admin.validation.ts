import { z } from 'zod';
import { userNameValidation } from '../../validations/userName.validation';

const createAdminValidationSchema = z.object({
  password: z.string().max(20, 'Password minimum 6 digit long').optional(),
  admin: z.object({
    name: userNameValidation,
    designation: z.string(),
    gender: z.enum(['Male', 'Female', 'Others']),
    dateOfBirth: z.string().transform((val) => new Date(val)),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImage: z.string().optional(),
  }),
});

export const AdminValidtions = {
  createAdminValidationSchema,
};
