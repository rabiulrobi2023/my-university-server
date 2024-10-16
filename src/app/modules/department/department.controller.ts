import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DepartmentServices } from './department.services';

const createDepartment = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await DepartmentServices.createDepartmentIntoDB(data);
  sendResponse(res, {
    message: 'Department created successfull',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getAllDepartmentsFromDB();
  sendResponse(res, {
    message: 'All department retrived successfull',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DepartmentServices.getSingleDepartmentFromDB(id);
  sendResponse(res, {
    message: 'The department retived successfull',
    data: result,
  });
});

const uptdateDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await DepartmentServices.updateDepartmentIntoDB(
    id,
    updateData,
  );
  sendResponse(res, {
    message: 'Department update successfull',
    data: result,
  });
});

export const DepartmenController = {
  createDepartment,
  getAllDepartment,
  uptdateDepartment,
  getSingleDepartment,
};
