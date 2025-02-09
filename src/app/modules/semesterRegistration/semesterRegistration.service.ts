import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { semesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  const isSemesterUpcommingOrOngoing = await SemesterRegistration.findOne({
    $or: [
      { status: semesterRegistrationStatus.Upcomming },
      { status: semesterRegistrationStatus.Ongoing },
    ],
  });

  if (isSemesterUpcommingOrOngoing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `A semester is already ${isSemesterUpcommingOrOngoing.status}`,
    );
  }

  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExist) {
    throw new AppError(httpStatus.CONFLICT, 'Semester already registerd');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .limit();

  const result = await semesterRegistrationQuery.queryModel;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (payload: string) => {
  const result =
    await SemesterRegistration.findById(payload).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The semester registration in not founded`,
    );
  }

  const currentSemesterStatus = isSemesterRegistrationExist.status;
  const requestSemesterStatus = payload?.status;
  if (currentSemesterStatus === semesterRegistrationStatus.Ended) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The semester already ${currentSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === semesterRegistrationStatus.Upcomming &&
    requestSemesterStatus === semesterRegistrationStatus.Ended
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not chant status directly from ${currentSemesterStatus} to ${requestSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === semesterRegistrationStatus.Ongoing &&
    requestSemesterStatus === semesterRegistrationStatus.Upcomming
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not chant status directly from ${currentSemesterStatus} to ${requestSemesterStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
