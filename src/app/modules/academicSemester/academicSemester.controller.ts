import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res) => {
  const semesterData = req.body.body;
  const result = AcademicSemesterServices.createAcademicSemesterIntoDB(semesterData);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Creation Susscessfull',
    data: result,
  });
});
export const AcademicSemesterController = {
  createAcademicSemester,
};
