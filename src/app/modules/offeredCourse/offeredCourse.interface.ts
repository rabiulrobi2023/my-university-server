
import { Types } from "mongoose"
export type TDays = 'Sat'|'Sun'|'Mon'|'Tue'|'Wed'|'Thu'

export type TOfferedCourse = {
    registeredSemester: Types.ObjectId;
    academicSemester: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    maxCapacity: number;
    section: number;
    days: TDays;
    startTime: string;
    endTime: string
}
