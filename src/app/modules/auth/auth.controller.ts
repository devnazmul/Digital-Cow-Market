import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import { authService } from './auth.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    if (!user.budget) {
      user.budget = 0;
    }
    user.income = 0;

    const result = await authService.createUser(user);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully.',
      data: result,
    });

    next();
  }
);

export const authController = {
  createUser,
};
