import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res) => {
  const semesterData = req.body.body;
  const result =
    AcademicSemesterServices.createAcademicSemesterIntoDB(semesterData);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Creation Susscessfull',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semesters Fatched Successfull',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester found',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body.body;
  const result = AcademicSemesterServices.updateAcademicSemesterIntoDB(
    id,
    updateData,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester updated successfull',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
