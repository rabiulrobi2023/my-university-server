import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const semestrationRegistrationData = await req.body;
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      semestrationRegistrationData,
    );
  sendResponse(res, {
    message: 'Semester Registration Successfull',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const query = req.query;
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(query);
  sendResponse(res, {
    message: 'Semester registration retrieve successfull',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
  sendResponse(res, {
    message: 'Semester registration retrieve successfully',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      updateData,
    );
  sendResponse(res, {
    message: 'Semester updated successfull',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration
};
