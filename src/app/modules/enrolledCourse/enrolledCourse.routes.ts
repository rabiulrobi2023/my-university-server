import { Router } from 'express';
import { EnrolledCourseController } from './enrolledCourse.controller';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
import validationRequest from '../../middlewares/validationRequest';

const router = Router();
router.post(
  '/create',
  auth(userRoles.student),
  EnrolledCourseController.createEnrolledOfferedCourse,
);

router.patch(
  '/update-marks',
  auth(userRoles.superAdmin, userRoles.admin, userRoles.faculty),
  validationRequest(
    EnrolledCourseValidation.updateEnrolledCourseMarksValidationSchema,
  ),
  EnrolledCourseController.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoute = router;
