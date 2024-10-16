import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { studentIdGenerator } from './user.utils';

const createStudentIntoDB = async (pass: string, studentData: TStudent) => {
  const admissionSemesterData = await AcademicSemester.findById(studentData.admissionSemester
  );
  const studentId = (
    await studentIdGenerator(admissionSemesterData)
  ).toString();

  const userData: Partial<TUser> = {
    id: studentId,
    password: pass || (config.defaultPass as string),
    role: 'student',
  };

  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
