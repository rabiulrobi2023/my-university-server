import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseSevices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const courseData = await req.body;
  const result = await CourseSevices.createCourseIntoDB(courseData);
  sendResponse(res, {
    message: 'Course created successfull',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await CourseSevices.getAllCourseFromDB(query);
  sendResponse(res, {
    message: 'Courses retrived successfull',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseSevices.getSingleCourseFromDB(id);
  sendResponse(res, {
    message: 'Course retrived successfull',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateCourseData = req.body;
  const result = await CourseSevices.updateCourseIntoDB(id, updateCourseData);
  sendResponse(res, {
    message: 'Course updated successfull',
    data: result,
  });
});

const deleteSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseSevices.deleteSingleCourseFromDB(id);
  sendResponse(res, {
    message: 'Course deleted successfull',
    data: result,
  });
});

const assignFacultyintoCourse = catchAsync(async (req, res) => {
  const course = req.params.course;
  const faculties = req.body.faculties;

  const result = await CourseSevices.assignFacultyIntoCourseIntoDB(
    course,
    faculties,
  );
  sendResponse(res, {
    message: 'Faculties assign successfull into course',
    data: result,
  });
});

const getSingleCourseWithFaculty = catchAsync(async (req, res) => {
  const courseId = req.params.course;
  const result = await CourseSevices.getSingleCourseWithFacultyFromDB(courseId);
  sendResponse(res, {
    message: 'Course with faculty retrived successfull',
    data: result,
  });
});

const deleteFacultiesFromCorse = catchAsync(async (req, res) => {
  const courseId = req.params.course;
  const faculties = req.body.faculties;
  const result = await CourseSevices.deleteFacultyFromCourseFromDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    message: 'Faculties is deleted successfull from course',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteSingleCourse,
  assignFacultyintoCourse,
  getSingleCourseWithFaculty,
  deleteFacultiesFromCorse,
};
