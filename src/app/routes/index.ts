import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentsRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

import { DepartmentRoute } from '../modules/department/department.rotue';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { CourseRouter } from '../modules/course/course.routes';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes';
import { OfferedCourseRouter } from '../modules/offeredCourse/offeredCourse.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentsRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
  { path: '/department', route: DepartmentRoute },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/course',
    route: CourseRouter,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  
  {
    path: '/offered-course',
    route: OfferedCourseRouter,
  },
  
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
