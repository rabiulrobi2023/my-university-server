export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'faculty' | 'student';
  staus: 'inProgress' | 'block';
  isDeleted: boolean;
};

// export type TNewUser = {
//   id: string;
//   password: string;
//   role: 'admin' | 'academicFaculty' | 'student';
// };
