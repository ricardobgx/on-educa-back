import { IStudentPerformanceWeekDayPerformanceUpdateValues } from './IUpdateStudentWeekDayPerformanceRequest';

export interface IUpdateStudentWeekPerformanceRequest
  extends IStudentPerformanceWeekDayPerformanceUpdateValues {
  studentId?: string;
}
