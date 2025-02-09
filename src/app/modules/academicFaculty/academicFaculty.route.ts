import { Router } from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = Router();
router.post('/create-academic-faculty', AcademicFacultyController.createAcademicFaculty);
router.get('/all-academic-faculties', AcademicFacultyController.getAllAcademicFaculties);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/update/:id',
  validationRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoute = router;
