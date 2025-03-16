import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import validationRequest from '../../middlewares/validationRequest';
import { FacultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';

const router = Router();

router.get(
  '/all-faculties',
  auth(userRoles.superAdmin, userRoles.admin),
  FacultyController.getAllFaculties,
);
router.get(
  '/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  FacultyController.getSingleFaculty,
);
router.patch(
  '/update/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(FacultyValidations.updateFacultyValidatinSchema),
  FacultyController.updateFaculty,
);
router.patch(
  '/delete/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  FacultyController.deleteSingleFaculty,
);

export const FacultyRoutes = router;
