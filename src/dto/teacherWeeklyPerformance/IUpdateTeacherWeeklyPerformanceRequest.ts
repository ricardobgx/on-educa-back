import { ITeacherPerformanceWeekDayPerformanceUpdateValues } from '../teacherWeekDayPerformance/IUpdateTeacherWeekDayPerformanceRequest';

export interface IUpdateTeacherWeeklyPerformanceRequest
  extends ITeacherPerformanceWeekDayPerformanceUpdateValues {
  teacherId?: string;
}
