import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.get('/all', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
export const StudentsRoutes = router;
