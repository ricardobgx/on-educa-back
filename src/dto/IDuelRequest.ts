export interface IDuelRequest {
  id?: string;
  maxGroupParticipants?: number;
  timeForQuestion?: number;
  questionsPerContent?: number;
  duelOwnerId?: string;
  contentsId?: string[];
}
