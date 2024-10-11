import { Request, Response } from 'express';
import { StudentServices } from './student.services';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const student = req.body.student;
//     const zodParsedStudentData = studentValidationSchema.parse(student);
//     const result =
//       await StudentServices.createStudedentInDB(zodParsedStudentData);
//     res.status(200).json({
//       success: true,
//       message: 'Student Created Successfully',
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//       Error: err,
//     });
//   }
// };

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student get successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student found by id',
      data: result,
    });
  } catch (err) {
    console.error(err);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
};
