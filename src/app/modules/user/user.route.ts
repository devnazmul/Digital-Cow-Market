import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.zod.validation';
const router = express.Router();

router.get(
  '/',

  userController.getAllUser
);
router.get('/:id', userController.getSingleUser);
router.patch(
  '/:id',
  validateRequest(userValidation.userZodSchemaForUpdate),
  userController.updateSingleUser
);
router.delete('/:id', userController.deleteSingleUser);

export const userRoutes = router;
