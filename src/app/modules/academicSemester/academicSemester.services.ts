import { TAcademicSemester } from './academicSemester.Interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = (payload: TAcademicSemester) => {
  const result = AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
