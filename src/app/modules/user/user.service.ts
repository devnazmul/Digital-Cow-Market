import httpStatus from 'http-status';
import ApiError from '../../../errorHandlers/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const getAllUser = async (): Promise<IUser[]> => {
  // GET ALL USERS
  const result = await User.find({}).select({
    _id: 1,
    name: 1,
    role: 1,
    phoneNumber: 1,
    address: 1,
    budget: 1,
    income: 1,
  });

  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  // GET SINGLE USER
  const result = await User.findOne({ _id: id }).select({
    _id: 1,
    name: 1,
    role: 1,
    phoneNumber: 1,
    address: 1,
    budget: 1,
    income: 1,
  });

  return result;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  // UPDATE SINGLE USER
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  } else {
    const result = await User.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    }).select({
      _id: 1,
      name: 1,
      role: 1,
      phoneNumber: 1,
      address: 1,
      budget: 1,
      income: 1,
    });
    return result;
  }
};

const deleteSingleUser = async (id: string): Promise<IUser | null> => {
  // DELETE SINGLE USER
  const isExist = await User.findOne({ _id: id }).select({
    _id: 1,
    name: 1,
    role: 1,
    phoneNumber: 1,
    address: 1,
    budget: 1,
    income: 1,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  } else {
    const result = await User.findByIdAndDelete({ _id: id });
    return result;
  }
};

export const userService = {
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
