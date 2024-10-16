import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidations } from './faculty.validation';
import validationRequest from '../../middlewares/validationRequest';

const router = Router();
router.post('/create-faculty', FacultyController.createFaculty);
router.get('/all-faculties', FacultyController.getAllFaculties);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/update/:id',
  validationRequest(FacultyValidations.createFacultyValidationSchema),
  FacultyController.updateFaculty,
);

export const FacultyRotues = router;
