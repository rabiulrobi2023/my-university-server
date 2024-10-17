import { TDepartment } from './department.interface';
import { Department } from './department.model';

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await Department.create(payload);
  return result;
};

const getAllDepartmentsFromDB = async () => {
  return await Department.find().populate('faculty');
};

const getSingleDepartmentFromDB = async (payload: string) => {
  return await Department.findById(payload).populate('faculty');
};

const updateDepartmentIntoDB = async (id: string, payload: TDepartment) => {
  const result = await Department.findOneAndUpdate({ _id: id }, payload);
  return result;
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentIntoDB,
};
