import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { userValidation } from '../user/user.zod.validation';
import { authController } from './auth.controller';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidation.userZodSchema),
  authController.createUser
);

export const authRoutes = router;
