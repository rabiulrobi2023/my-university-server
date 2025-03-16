import { Router } from 'express';
import { CourseController } from './course.controller';
import validationRequest from '../../middlewares/validationRequest';
import { CourseValidations } from './course.validation';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';

const router = Router();

router.post(
  '/create-course',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get(
  '/all-course',
  auth(
    userRoles.superAdmin,
    userRoles.admin,
    userRoles.faculty,
    userRoles.student,
  ),
  CourseController.getAllCourse,
);

router.get(
  '/:id',
  auth(userRoles.superAdmin, userRoles.admin, userRoles.faculty),
  CourseController.getSingleCourse,
);

router.patch(
  '/update/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.patch(
  '/delete/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  CourseController.deleteSingleCourse,
);

router.put(
  '/:course/faculties',
  auth(userRoles.superAdmin, userRoles.admin, userRoles.faculty),
  validationRequest(CourseValidations.courseFacultyValidationSchema),
  CourseController.assignFacultyintoCourse,
);

router.get('/:course/faculties', CourseController.getSingleCourseWithFaculty);

router.patch(
  '/:course/delete-faculties',
  auth(userRoles.superAdmin, userRoles.admin),
  CourseController.deleteFacultiesFromCorse,
);

export const CourseRouter = router;
