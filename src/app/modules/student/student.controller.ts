import { Request, Response } from 'express';
import { StudentServices } from './student.services';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: result.length?true:false,
    message: result.length?'Student get successfully':"There is no any student",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  res.status(200).json({
    success: result?true:false,
    message: result?`Student found by id ${studentId}`:"Student not found",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
};
