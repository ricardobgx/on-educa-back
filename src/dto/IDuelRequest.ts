export interface IDuelRequest {
  id?: string;
  code?: string;
  maxGroupParticipants?: number;
  timeForQuestion?: number;
  questionsPerContent?: number;
  studentId?: string;
  contentsId?: string[];
}
