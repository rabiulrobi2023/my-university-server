import { Router } from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';

const router = Router();
router.post(
  '/create-academic-faculty',
  auth(userRoles.superAdmin, userRoles.admin),
  AcademicFacultyController.createAcademicFaculty,
);
router.get(
  '/all-academic-faculties',
  AcademicFacultyController.getAllAcademicFaculties,
);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/update/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoute = router;
