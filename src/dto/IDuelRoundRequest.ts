export interface IDuelRoundRequest {
  id?: string;
  maxGroupParticipants?: number;
  timeForQuestion?: number;
  questionsPerContent?: number;
  contentsId?: string[];
}
