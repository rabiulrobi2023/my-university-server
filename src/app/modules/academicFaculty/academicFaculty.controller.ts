import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const facultyData = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(facultyData);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculty created successfull',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    message: 'All academic faculties retrived successfull',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);
  sendResponse(res, {
    message: 'Academic faculty retrived successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    id,
    updateData,
  );
  sendResponse(res, {
    message: 'Academic faculty updated successfull',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
