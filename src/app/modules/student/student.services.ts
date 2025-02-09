import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableField } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // let searchTerm = '';
  // if (query.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: searchField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // const queryObj = { ...query };
  // const excludeFilterField = ['searchTerm', 'sort', 'limit','page','fields'];
  // excludeFilterField.forEach((el) => delete queryObj[el]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  // .populate('user')
  // .populate('admissionSemester')
  // .populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: 'academicFaculty',
  //   },
  // });

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query?.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let limit = 5;
  // let page = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit) as number;
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = Number((page - 1) * limit);
  // }

  // const paginationQuery = sortQuery.skip(skip);

  // const limitQuery =  paginationQuery.limit(limit);

  // let fields = '-__v'
  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ')
  // }

  // const fieldQuery = await limitQuery.select(fields)
  // return fieldQuery;
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .limit();

  const result = await studentQuery.queryModel;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateStudentData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateStudentData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate(
    { id },
    modifiedUpdateStudentData,
  );
  return result;
};

const deleteStudentIntoDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedUser;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentIntoDB,
  updateStudentIntoDB,
};
