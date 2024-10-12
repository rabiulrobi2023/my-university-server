import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { StudentsRoutes } from '../modules/student/students.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/students',
    route: StudentsRoutes,
  },
];
moduleRoutes.forEach(route=> router.use(route.path, route.route));
export default router;
