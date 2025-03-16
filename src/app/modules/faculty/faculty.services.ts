import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.interface';
import mongoose from 'mongoose';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { facultySearchableField } from './faculty.constant';

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find()
      .populate('user')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(facultySearchableField)
    .filter()
    .sort()
    .paginate()
    .limit();
  const result = await facultyQuery.queryModel;
  const meta = await facultyQuery.totalCount();
  return {
    meta,
    result,
  };
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id);
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;
  const modifiedUpdateFacultyData: Record<string, unknown> =
    remainingFacultyData;

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateFacultyData[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate(
    id,
    modifiedUpdateFacultyData,
    { new: true },
  );

  return result;
};

const deleteSingleFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_GATEWAY, 'Fail to delete faculty');
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_GATEWAY, 'Fail to delete faculty6666');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};
export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteSingleFacultyFromDB,
};
