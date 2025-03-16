import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validationRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';

const router = express.Router();

router.get(
  '/all',
  auth(userRoles.superAdmin, userRoles.admin),
  StudentController.getAllStudents,
);
router.get(
  '/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  StudentController.getSingleStudent,
);
router.patch(
  '/update/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(updateStudentValidationSchema),
  StudentController.updateSutdent,
);
router.patch(
  '/delete/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  StudentController.deleteStudent,
);
export const StudentsRoutes = router;
