import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { ICow } from './cow.interface';
import { cowService } from './cow.service';

const createCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cow = req.body;
    cow.label = 'for sale';

    const result = await cowService.createCow(cow);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow created successfully.',
      data: result,
    });

    next();
  }
);

const getAllCows = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, [
      'searchTerm',
      'location',
      'maxPrice',
      'minPrice',
    ]);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await cowService.getAllCows(filters, paginationOptions);

    sendResponse<ICow[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cows retrived successfully!',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

const getSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await cowService.getSingleCow(id);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow retrieved successfully!',
      data: result,
    });

    next();
  }
);

const updateSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await cowService.updateSingleCow(id, updatedData);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow created successfully.',
      data: result,
    });

    next();
  }
);

const deleteSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await cowService.deleteSingleCow(id);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow deleted successfully.',
      data: result,
    });

    next();
  }
);

export const cowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateSingleCow,
  deleteSingleCow,
};
