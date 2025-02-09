import { User } from '../user/user.model';

const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1 }).sort(
    '-createdAt',
  );
  const lastFacultyId = lastFaculty?.id;
  const last3Digit = Number(lastFacultyId?.substring(2, 6));
  return last3Digit || undefined;
};

export const facultyIdGenerator = async () => {
  const lastFacultyId = await findLastFacultyId();
  let initialCurrentFacultyLast3Digit = 0;

  if (lastFacultyId) {
    initialCurrentFacultyLast3Digit = lastFacultyId + 1;
  } else {
    initialCurrentFacultyLast3Digit = initialCurrentFacultyLast3Digit + 1;
  }

  const newFacultyLast3Digit = initialCurrentFacultyLast3Digit
    .toString()
    .padStart(3, '0');
  const newFacultyId = `F-${newFacultyLast3Digit}`;
  return newFacultyId;
};
