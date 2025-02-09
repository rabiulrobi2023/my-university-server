
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.molel';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (payload: string) => {
  const result = await AcademicFaculty.findById(payload);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, {
    $set: payload,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
