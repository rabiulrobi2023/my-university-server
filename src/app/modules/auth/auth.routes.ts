import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validationRequest from '../../middlewares/validationRequest';

const router = Router();
router.post(
  '/login',
  validationRequest(AuthValidation.loginUserValidation),
  AuthController.loginUser,
);

export const AuthRouter = router;
