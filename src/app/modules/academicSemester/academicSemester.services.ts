import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.Interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] != payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (payload: string) => {
  const result = await AcademicSemester.findOne({ _id: payload });
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  updateData: Partial<TAcademicSemester>,
) => {
  if (
    updateData.name &&
    updateData.code &&
    academicSemesterNameCodeMapper[updateData.name] !== updateData.code
  ) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    { $set: updateData },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
