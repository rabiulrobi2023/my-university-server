import { Router } from 'express';
import { CourseController } from './course.controller';
import validationRequest from '../../middlewares/validationRequest';
import { CourseValidations } from './course.validation';

const router = Router();

router.post(
  '/create-course',
  validationRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/all-course', CourseController.getAllCourse);

router.get('/:id', CourseController.getSingleCourse);

router.patch(
  '/update/:id',
  validationRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.patch('/delete/:id', CourseController.deleteSingleCourse);

router.put(
  '/:course/faculties',
  validationRequest(CourseValidations.courseFacultyValidationSchema),
  CourseController.assignFacultyintoCourse,
);

router.patch(
  '/:course/delete-faculties',
  CourseController.deleteFacultiesFromCorse,
);

export const CourseRouter = router;
