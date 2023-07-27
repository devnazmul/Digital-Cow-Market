import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errorHandlers/ApiError';
import { handleValidationError } from '../errorHandlers/handleValidationError';
import handleZodError from '../errorHandlers/handleZodError';
import { IGenericErrorMessage } from '../interfaces/error';

const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  // console.log({ error });
  let status = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);

    status = simplifiedError?.status;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof ApiError) {
    status = error.status;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    status = simplifiedError?.status;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof Error) {
    message = error?.name;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }
  if (config.ENV !== 'production') {
    console.log({
      success: false,
      status,
      message,
      errorMessages,
      stack: error?.stack,
    });
  }

  res.status(status).json({
    success: false,
    status,
    message,
    errorMessages,
    stack: config.ENV !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
