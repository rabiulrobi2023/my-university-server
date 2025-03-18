import { Router } from 'express';
import { OfferedCourseValidations } from './offeredCourse.validations';
import validationRequest from '../../middlewares/validationRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { userRoles } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = Router();
router.post(
  '/create',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(OfferedCourseValidations.createOfferedCourseValidtaion),
  OfferedCourseController.createOfferedCourse,
);

router.get(
  '/all',
  auth(userRoles.superAdmin, userRoles.admin),
  OfferedCourseController.getAllOfferedCourse,
);

router.get(
  '/single-course/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  OfferedCourseController.getSingleOfferedCourse,
);

router.get(
  '/my-offered-courses',
  auth(userRoles.student),
  OfferedCourseController.getMyOfferedCourses,
);

router.patch(
  '/update/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(OfferedCourseValidations.updateOfferedCourseValidation),
  OfferedCourseController.updateOfferedCourse,
);

export const OfferedCourseRouter = router;
