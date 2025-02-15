import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validationRequest from '../../middlewares/validationRequest';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';

const router = Router();
router.post(
  '/login',
  validationRequest(AuthValidation.loginUserValidation),
  AuthController.loginUser,
);

router.post(
  '/change-password',auth(userRole.admin,userRole.faculty,userRole.student),
  validationRequest(AuthValidation.changePasswordValidation),
  AuthController.changePassword,
);

export const AuthRouter = router;
