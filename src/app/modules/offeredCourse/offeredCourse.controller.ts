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
  const query = req.query;
  const result = await OfferedCourseSevieces.getAllOfferedCourseFromDB(query);
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

const getMyOfferedCourses = catchAsync(async (req, res) => {
  const id = req.user?.id;
  const result = await OfferedCourseSevieces.getMyOfferedCoursesFromDB(id);
  sendResponse(res, {
    message: 'My offered course retirved successfull',
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
  getMyOfferedCourses,
  updateOfferedCourse,
};
