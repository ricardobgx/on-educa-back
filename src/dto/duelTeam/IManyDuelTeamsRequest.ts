interface IBasicDuelTeamParams {
  name?: string;
  studentsIds?: string[];
}

export interface IManyDuelTeamsRequest {
  basicDuelTeamsParams: IBasicDuelTeamParams[];
}
