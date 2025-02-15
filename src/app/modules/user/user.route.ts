import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { AdminValidtions } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { userRole } from './user.constant';
import { TUserRole } from './user.interface';

const router = express.Router();

router.post(
  '/create-student',
  auth(userRole.admin as TUserRole),
  validationRequest(createStudentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-admin',
  validationRequest(AdminValidtions.createAdminValidationSchema),
  userController.createAdmin,
);

router.post(
  '/create-faculty',
  // validationRequest(FacultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);

router.get('/all-users', userController.getAllUsers);
export const UserRoutes = router;
