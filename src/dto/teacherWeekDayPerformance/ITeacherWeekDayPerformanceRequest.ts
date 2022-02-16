import { IPeopleWeekDayPerformanceRequest } from '../people/IPeopleWeekDayPerformanceRequest';

export interface ITeacherWeekDayPerformanceRequest
  extends IPeopleWeekDayPerformanceRequest {
  contentsCreated?: number;
  questionsCreated?: number;
  doubtsSolved?: number;
  interativeRoomsCreated?: number;
}
