export interface IStudentWeekDayPerformanceRequest {
  id?: string;
  dailyXP?: number;
  studiedContents?: number;
  questionsAnswered?: number;
  rightQuestionsAnswered?: number;
  duelsParticipated?: number;
  duelsWon?: number;
  date?: string;
  weekPerformanceId?: string;
}
