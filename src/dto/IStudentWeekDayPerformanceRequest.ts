import { IPeopleWeekDayPerformanceRequest } from './IPeopleWeekDayPerformanceRequest';

export interface IStudentWeekDayPerformanceRequest
  extends IPeopleWeekDayPerformanceRequest {
  contentsStudied?: number;
  questionsAnswered?: number;
  questionsAnsweredCorrectly?: number;
  duelsParticipated?: number;
  duelsWon?: number;
}
