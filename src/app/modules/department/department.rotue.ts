import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { DepartmentValidations } from './department.validation';
import { DepartmenController } from './department.controller';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';

const router = Router();

router.post(
  '/create-department',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(DepartmentValidations.createDepartmentValidation),
  DepartmenController.createDepartment,
);

router.get('/all-departments', DepartmenController.getAllDepartment);
router.get('/:id', DepartmenController.getSingleDepartment);
router.patch(
  '/update/:id',
  auth(userRoles.superAdmin, userRoles.admin),
  validationRequest(DepartmentValidations.updateDepartmentValidation),
  DepartmenController.uptdateDepartment,
);

export const DepartmentRoute = router;
