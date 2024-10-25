import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validationRequest';
import { updateStudentValidationSchema } from './student.validation';
const router = express.Router();

router.get('/all', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/update/:id',
  validationRequest(updateStudentValidationSchema),
  StudentController.updateSutdent,
);
router.patch('/delete/:id', StudentController.deleteStudent);
export const StudentsRoutes = router;
