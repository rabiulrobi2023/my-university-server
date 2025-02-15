import { Router } from 'express';
import { OfferedCourseValidations } from './offeredCourse.validations';
import validationRequest from '../../middlewares/validationRequest';
import { OfferedCourseController } from './offeredCourse.controller';

const router = Router();
router.post(
  '/create',
  validationRequest(OfferedCourseValidations.createOfferedCourseValidtaion),
  OfferedCourseController.createOfferedCourse,
);

router.patch('/update/:id',validationRequest(OfferedCourseValidations.updateOfferedCourseValidation),OfferedCourseController.updateOfferedCourse)

export const OfferedCourseRouter = router;
