import { IStudentPerformanceWeekDayPerformanceUpdateValues } from './IUpdateStudentWeekDayPerformanceRequest';

export interface IUpdateStudentWeeklyPerformanceRequest
  extends IStudentPerformanceWeekDayPerformanceUpdateValues {
  studentId?: string;
}
