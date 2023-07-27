import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { cowController } from './cow.controller';
import { cowValidation } from './cow.zod.validation';
const router = express.Router();

// CREATE COW
router.post(
  '/',
  validateRequest(cowValidation.cowZodSchema),
  cowController.createCow
);

// GET ALL COWS
router.get('/', cowController.getAllCows);

// GET SINGLE COW
router.get('/:id', cowController.getSingleCow);

// UPDATE SINGLE COW
router.patch(
  '/:id',
  validateRequest(cowValidation.cowZodSchemaForUpdate),
  cowController.updateSingleCow
);

// DELETE SINGLE COW
router.delete('/:id', cowController.deleteSingleCow);

export const cowRoutes = router;
