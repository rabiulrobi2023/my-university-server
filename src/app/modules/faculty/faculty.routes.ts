import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import validationRequest from '../../middlewares/validationRequest';
import { FacultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { TUserRole } from '../user/user.interface';

const router = Router();

router.get(
  '/all-faculties',
  auth(userRole.admin as TUserRole),
  FacultyController.getAllFaculties,
);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/update/:id',
  validationRequest(FacultyValidations.updateFacultyValidatinSchema),
  FacultyController.updateFaculty,
);
router.patch('/delete/:id', FacultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
