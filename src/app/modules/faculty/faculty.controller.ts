import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.services';

const getAllFaculties = catchAsync(async (req, res) => {
  const query= req.query
  const result = await FacultyServices.getAllFacultyFromDB(query);
  sendResponse(res, {
    message: 'The faculties retrieved successfully ',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyServices.getSingleFacultyFromDB(id);
  sendResponse(res, {
    message: 'The faculty retrieved successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const query = req.body;

  const result = await FacultyServices.updateFacultyIntoDB(id, query);
  sendResponse(res, {
    message: 'Faculty updated successfull',
    data: result,
  });
});

const deleteSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyServices.deleteSingleFacultyFromDB(id);
  sendResponse(res, {
    message: 'Faculty is deleted successfull',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteSingleFaculty,
};
