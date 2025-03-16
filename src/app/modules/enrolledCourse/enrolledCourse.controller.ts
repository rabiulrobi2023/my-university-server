import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledOfferedCourse = catchAsync(async (req, res) => {
  const studentId = req.user.id;
  const offeredCourseId = req.body.offeredCourse;

  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    studentId,
    offeredCourseId,
  );
  sendResponse(res, {
    message: 'Course enrolled successfull',
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.id
  const result = await EnrolledCourseServices.updateEnrolledCourseMarks(facultyId,req.body);
  sendResponse(res, {
    message: 'Marks update successfull',
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledOfferedCourse,
  updateEnrolledCourseMarks
};
