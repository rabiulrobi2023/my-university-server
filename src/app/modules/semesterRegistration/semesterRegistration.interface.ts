import { Types } from 'mongoose';

type TStatus = 'Upcomming' | 'Ongoing' | 'Ended';

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: TStatus;
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number
};
