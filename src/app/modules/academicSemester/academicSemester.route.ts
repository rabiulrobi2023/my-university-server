import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemeterValidations } from './academicSemester.validationSchema';

const router = Router();
router.use(
  '/create',
  validationRequest(AcademicSemeterValidations.createAcademicValidationSchema),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
