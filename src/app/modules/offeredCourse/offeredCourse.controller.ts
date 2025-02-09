import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseSevieces } from './offeredCourseServices';

const createOfferedCourse = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await OfferedCourseSevieces.createOfferedCorseIntoDB(data);
  sendResponse(res, {
    message: 'Offered course create successfully',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
};
