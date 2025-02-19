import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validationRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';

const router = express.Router();

router.get('/all', StudentController.getAllStudents);
router.get(
  '/:id',
  auth(userRoles.admin),
  StudentController.getSingleStudent,
);
router.patch(
  '/update/:id',
  validationRequest(updateStudentValidationSchema),
  StudentController.updateSutdent,
);
router.patch('/delete/:id', StudentController.deleteStudent);
export const StudentsRoutes = router;
