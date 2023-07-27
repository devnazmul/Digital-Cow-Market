import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // CREATING USER
  const createdUser = await User.create(user);

  // IF USER NOT CREATED
  if (!createdUser) {
    throw new Error('Failed to create user!');
  }

  // IF USER CREATED SUCCESSFULLY
  return createdUser;
};

export const authService = {
  createUser,
};
