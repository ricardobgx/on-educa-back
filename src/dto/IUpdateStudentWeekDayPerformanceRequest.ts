export interface IStudentPerformanceWeekDayPerformanceUpdateValues {
  dailyXPNumber?: number;
  studiedContentsNumber?: number;
  questionsAnsweredNumber?: number;
  rightQuestionsAnsweredNumber?: number;
  duelsParticipatedNumber?: number;
  duelsWonNumber?: number;
}

export interface IUpdateStudentWeekDayPerformanceRequest
  extends IStudentPerformanceWeekDayPerformanceUpdateValues {
  id?: string;
}
