export interface IDuelTeamRequest {
  id?: string;
  name?: string;
  lastParticipantIndex?: number;
  duelRoundId?: string;
  studentsIds?: string[];
}
