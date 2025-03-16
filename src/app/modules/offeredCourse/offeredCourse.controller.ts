import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseSevieces } from './offeredCourse.Services';

const createOfferedCourse = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await OfferedCourseSevieces.createOfferedCorseIntoDB(data);
  sendResponse(res, {
    message: 'Offered course create successfully',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseSevieces.getAllOfferedCourseFromDB();
  sendResponse(res, {
    message: 'Offered courses retrived successfull',
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OfferedCourseSevieces.getSingleOfferedCourseFromDB(id);
  sendResponse(res, {
    message: 'Offered course retrived successfull',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await OfferedCourseSevieces.updateOfferedCourseIntoDB(
    id,
    data,
  );
  sendResponse(res, {
    message: 'Offered course updated successfull',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
