import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { AdminValidtions } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { userRoles } from './user.constant';
import { UserValidations } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';
import { FacultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(userRoles.superAdmin, userRoles.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(createStudentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-admin',
  auth(userRoles.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(AdminValidtions.createAdminValidationSchema),
  userController.createAdmin,
);

router.post(
  '/create-faculty',
  auth(userRoles.superAdmin, userRoles.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(FacultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);

router.get(
  '/all-users',
  auth(userRoles.superAdmin, userRoles.admin),
  userController.getAllUsers,
);

router.get(
  '/me',
  auth(
    userRoles.superAdmin,
    userRoles.admin,
    userRoles.faculty,
    userRoles.student,
  ),
  userController.getMe,
);

router.patch(
  '/change-status/:id',
  auth(userRoles.superAdmin, userRoles.superAdmin, userRoles.admin),
  validationRequest(UserValidations.userStatusValidation),
  userController.userStatusChange,
);

export const UserRoutes = router;
