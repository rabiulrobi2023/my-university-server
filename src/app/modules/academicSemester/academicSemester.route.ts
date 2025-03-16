import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemeterValidations } from './academicSemester.validation';
import { userRoles } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = Router();
router.post(
  '/create',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(
    AcademicSemeterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get('/all', AcademicSemesterController.getAllAcademicSemesters);
router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);
router.patch(
  '/update/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(
    AcademicSemeterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
