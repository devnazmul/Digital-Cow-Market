import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllUser();

    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully.',
      data: result,
    });

    next();
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await userService.getSingleUser(id);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully.',
      data: result,
    });

    next();
  }
);

const updateSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await userService.updateSingleUser(id, updatedData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully.',
      data: result,
    });

    next();
  }
);

const deleteSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await userService.deleteSingleUser(id);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully.',
      data: result,
    });

    next();
  }
);

export const userController = {
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
