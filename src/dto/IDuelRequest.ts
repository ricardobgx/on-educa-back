export interface IDuelRequest {
  id?: string;
  maxGroupParticipants?: number;
  timeForQuestion?: number;
  questionsPerContent?: number;
  studentId?: string;
  contentsId?: string[];
}
