export interface IDuelTeamRequest {
  id?: string;
  name?: string;
  index?: number;
  lastParticipantIndex?: number;
  duelRoundId?: string;
  studentsIds?: string[];
}
