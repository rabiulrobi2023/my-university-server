import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.molel';

const createFacultyIntoDB = async (payload: TFaculty) => {
  const result = await Faculty.create(payload);
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find();
  return result;
};

const getSingleFacultyFromDB = async (payload: string) => {
  const result = await Faculty.findById(payload);
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: TFaculty) => {
  const result = await Faculty.findByIdAndUpdate(id, {
    $set: payload,
  });
  return result;
};

export const FacultyServices = {
  createFacultyIntoDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
};
