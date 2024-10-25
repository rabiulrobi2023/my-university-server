/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode||500;
  console.log({statusCode})
  const errorMessage = err.message || 'Something went wrong';

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error: err,
  });
};
export default globalErrorHandler;
