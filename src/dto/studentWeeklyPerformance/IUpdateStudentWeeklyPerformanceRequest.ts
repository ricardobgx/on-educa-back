import { IStudentPerformanceWeekDayPerformanceUpdateValues } from '../studentWeekDayPerformance/IUpdateStudentWeekDayPerformanceRequest';

export interface IUpdateStudentWeeklyPerformanceRequest
  extends IStudentPerformanceWeekDayPerformanceUpdateValues {
  studentId?: string;
}
