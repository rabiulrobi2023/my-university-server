import { Request, Response } from 'express';

import { userService } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const userPass = req.body.password;
    const studentData = req.body.student;
    // const zodParsedUserData = userValidation.userValidationSchema.parse(userPass,studentData)
    const result = await userService.createStudentIntoDB(userPass,studentData);
    console.log(result)
    res.status(200).json({
      success: true,
      message: 'Student Createtion Successfull',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something error',
      error: err,
    });
  }
};

export const userController = {
  createUser,
};
