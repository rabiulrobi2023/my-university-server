import { TDays } from './offeredCourse.interface';
type TSchedule = {
  days: [TDays];
  startTime: string;
  endTime: string;
};

const hasCoflictClassSchedule = (
  assignSchedule: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignSchedule) {
    const assignStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const assignEndtime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTme = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartTme < assignEndtime && newEndTime > assignStartTime) {
      return true;
    }
  }
  return false;
};
export default hasCoflictClassSchedule