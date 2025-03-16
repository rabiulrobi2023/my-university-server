import { Router } from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validationRequest from '../../middlewares/validationRequest';
import { SemesterRegistrationValidations } from './semesterRegistrationValition';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';

const router = Router();

router.post(
  '/create-new',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.get('/all', SemesterRegistrationController.getAllSemesterRegistration);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/update/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(
    SemesterRegistrationValidations.updateSemesterValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
