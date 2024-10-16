import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { DepartmentValidations } from './department.validation';
import { DepartmenController } from './department.controller';

const router = Router();

router.post(
  '/create-department',
  validationRequest(DepartmentValidations.createDepartmentValidation),
  DepartmenController.createDepartment,
);

router.get('/all-departments', DepartmenController.getAllDepartment);
router.get('/:id', DepartmenController.getSingleDepartment);
router.get('/update/:id',validationRequest(DepartmentValidations.updateDepartmentValidation), DepartmenController.uptdateDepartment);

export const DepartmentRoute = router
