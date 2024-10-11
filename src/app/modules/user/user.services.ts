import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (pass: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {
    id: '100002',
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
