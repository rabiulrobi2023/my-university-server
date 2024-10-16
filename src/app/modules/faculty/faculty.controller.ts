import { FacultyServices } from './faculty.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createFaculty = catchAsync(async (req, res) => {
  const facultyData = req.body;
  const result = await FacultyServices.createFacultyIntoDB(facultyData);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculty created successfull',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB();
  sendResponse(res, {
    message: 'All faculties retrived successfull',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyServices.getSingleFacultyFromDB(id);
  sendResponse(res, {
    message: 'Faculty retrived successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData= req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id,updateData);
  sendResponse(res, {
    message: 'Faculty updated successfull',
    data: result,
  });
});

export const FacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty
};
