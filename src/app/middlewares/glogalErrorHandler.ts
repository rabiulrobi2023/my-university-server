/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { handldeZodError } from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import AppError from '../error/appError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  let sources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifyError = handldeZodError(err);
    statusCode = simplifyError?.statusCode;
    message = simplifyError?.message;
    sources = simplifyError?.errorSources;
  } else if (err.name === 'ValidationError') {
    const simplifyError = handleValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    sources = simplifyError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    sources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    sources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err.name === 'CastError') {
    const simplifyError = handleCastError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    sources = simplifyError.errorSources;
  } else if (err.code === 11000) {
    const simplifyError = handleDuplicateError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    sources = simplifyError.errorSources;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    sources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
export default globalErrorHandler;
