import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemeterValidations } from './academicSemester.validation';

const router = Router();
router.post(
  '/create',
  validationRequest(
    AcademicSemeterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get('/all', AcademicSemesterController.getAllAcademicSemesters);
router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);
router.patch(
  '/update/:id',
  validationRequest(
    AcademicSemeterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
