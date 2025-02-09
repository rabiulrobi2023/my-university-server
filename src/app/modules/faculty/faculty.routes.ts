import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import validationRequest from '../../middlewares/validationRequest';
import { FacultyValidations } from './faculty.validation';

const router = Router();

router.get('/all', FacultyController.getAllFaculties);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch('/update/:id', validationRequest(FacultyValidations.updateFacultyValidatinSchema), FacultyController.updateFaculty);
router.patch('/delete/:id', FacultyController.deleteSingleFaculty);

export const FacultyRoutes = router