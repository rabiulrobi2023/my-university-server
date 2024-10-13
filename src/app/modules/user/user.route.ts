import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';
import { createStudentValidationSchema } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validationRequest(createStudentValidationSchema),
  userController.createUser,
);
export const UserRoutes = router;
