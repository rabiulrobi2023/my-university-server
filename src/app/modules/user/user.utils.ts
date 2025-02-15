import { TAcademicSemester } from '../academicSemester/academicSemester.Interface';

import { User } from './user.model';

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent ? lastStudent.id : undefined;
};

export const studentIdGenerator = async (payload: TAcademicSemester) => {
  const currentStudentYear = payload?.year;
  const currentStudentSemesterCode = payload?.code;

  const lastStudentId = await findLastStudent();
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastSutudentIdLast4digit = lastStudentId?.substring(6);

  let initiialLastFourDigit = 0;

  if (
    lastStudentId &&
    currentStudentYear === lastStudentYear &&
    currentStudentSemesterCode === lastStudentSemesterCode
  ) {
    initiialLastFourDigit = Number(lastSutudentIdLast4digit);
  }
  const inrementedLast4Digit = (initiialLastFourDigit + 1)
    .toString()
    .padStart(4, '0');

  const currentStudentId = `${currentStudentYear}${currentStudentSemesterCode}${inrementedLast4Digit}`;

  return currentStudentId;
};

const findLastAdmin = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastAdmin ? lastAdmin.id : undefined;
};

export const adminIdGenerator = async () => {
  let adminId = 'A-0001';
  const lastAdminId = await findLastAdmin();

  if (lastAdminId) {
    const existAdminIdDigit = Number(lastAdminId.substring(2, 6));
    const newAdminDigit = (existAdminIdDigit + 1).toString().padStart(4, '0');
    adminId = `A-${newAdminDigit}`;
  }
  return adminId;
};
