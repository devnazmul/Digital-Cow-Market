import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errorHandlers/ApiError';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  // CREATING COW
  const createdCow = await Cow.create(cow);

  // IF COW NOT CREATED
  if (!createdCow) {
    throw new Error('Failed to create cow!');
  }

  // IF COW CREATED SUCCESSFULLY
  return createdCow;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const searchableFields = ['location', 'breed', 'category'];
  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        $gte: minPrice,
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        $lte: maxPrice,
      },
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // GET COWS
  let result: ICow[];
  // COUNT
  let total: number;
  if (andConditions.length > 0) {
    result = await Cow.find({ $and: andConditions })
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    total = await Cow.find({ $and: andConditions }).countDocuments();
  } else {
    result = await Cow.find().sort(sortConditions).skip(skip).limit(limit);
    total = await Cow.find().countDocuments();
  }

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result === null ? [] : result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  // GET SINGLE COW
  const result = await Cow.findOne({ _id: id });

  return result;
};

const updateSingleCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  // UPDATE SINGLE COW
  const isExist = await Cow.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found !');
  } else {
    const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  }
};

const deleteSingleCow = async (id: string): Promise<ICow | null> => {
  // DELETE SINGLE COW
  const isExist = await Cow.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found !');
  } else {
    const result = await Cow.findByIdAndDelete({ _id: id });
    return result;
  }
};

export const cowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateSingleCow,
  deleteSingleCow,
};
