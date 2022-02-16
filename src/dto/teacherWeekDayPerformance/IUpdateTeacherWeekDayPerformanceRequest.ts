export interface ITeacherPerformanceWeekDayPerformanceUpdateValues {
  dailyXPNumber?: number;
  contentsCreatedNumber?: number;
  questionsCreatedNumber?: number;
  doubtsSolvedNumber?: number;
  interativeRoomsCreatedNumber?: number;
}

export interface IUpdateTeacherWeekDayPerformanceRequest
  extends ITeacherPerformanceWeekDayPerformanceUpdateValues {
  id?: string;
}
