import { DuelTeam } from '../entities/DuelTeam';

export const sortDuelTeams = (teams: DuelTeam[]): DuelTeam[] => {
  return teams.sort((teamA: DuelTeam, teamB: DuelTeam) => {
    return teamA.index > teamB.index ? 1 : -1;
  });
};
