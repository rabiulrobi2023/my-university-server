import { TDepartment } from './department.interface';
import { Department } from './department.model';

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await Department.create(payload);
  return result;
};

const getAllDepartmentsFromDB = async () => {
  return await Department.find();
};

const getSingleDepartmentFromDB = async (payload: string) => {
  return await Department.findById(payload);
};

const updateDepartmentIntoDB = async (id: string, payload: TDepartment) => {
  return await Department.findOneAndUpdate({_id:id}, payload);
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentIntoDB,
};
