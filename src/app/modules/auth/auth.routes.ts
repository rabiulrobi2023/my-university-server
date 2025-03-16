import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validationRequest from '../../middlewares/validationRequest';
import auth from '../../middlewares/auth';
import { userRoles } from '../user/user.constant';

const router = Router();
router.post(
  '/login',
  validationRequest(AuthValidation.loginUserValidation),
  AuthController.loginUser,
);

router.post(
  '/change-password',
  auth(
    userRoles.superAdmin,
    userRoles.admin,
    userRoles.faculty,
    userRoles.student,
  ),
  validationRequest(AuthValidation.changePasswordValidation),
  AuthController.changePassword,
);

router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidation),
  AuthController.refreshToken,
);
router.post(
  '/forgot-password',
  validationRequest(AuthValidation.forgotPassowrdValidation),
  AuthController.forgotPassword,
);

router.post(
  '/reset-password',
  validationRequest(AuthValidation.resetPasswordValidation),
  AuthController.resetPassword,
);

export const AuthRouter = router;
