import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
  message?: string | null;
  data?: T | null;
};

export const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};
