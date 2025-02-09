import { Router } from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validationRequest from '../../middlewares/validationRequest';
import { SemesterRegistrationValidations } from './semesterRegistrationValition';

const router = Router();

router.post(
  '/create-new-semester',
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
  validationRequest(
    SemesterRegistrationValidations.updateSemesterValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
