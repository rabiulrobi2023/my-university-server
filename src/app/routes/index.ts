import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentsRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { FacultyRotues } from '../modules/faculty/faculty.route';
import { DepartmentRoute } from '../modules/department/department.rotue';

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
    path: '/faculty',
    route: FacultyRotues,
  },
  { path: '/department', route: DepartmentRoute },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
