import { NextFunction, Request, Response } from 'express';

import { userService } from './user.services';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userPass = req.body.password;
    const studentData = req.body.student;
    // const zodParsedUserData = userValidation.userValidationSchema.parse(userPass,studentData)
    const result = await userService.createStudentIntoDB(userPass, studentData);
    res.status(200).json({
      success: true,
      message: 'Student Createtion Successfull',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
};
