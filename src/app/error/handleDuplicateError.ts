/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse, TErrorSources } from '../interface/error';

const handleDuplicateError = (err: any): TErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Id',
    errorSources,

  };
};
export default handleDuplicateError;
