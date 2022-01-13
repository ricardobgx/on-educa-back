import { DuelTeamParticipation } from '../entities/DuelTeamParticipation';

export const sortDuelTeamParticipations = (
  participations: DuelTeamParticipation[]
): DuelTeamParticipation[] => {
  return participations.sort(
    (
      participationA: DuelTeamParticipation,
      participationB: DuelTeamParticipation
    ) => {
      return participationA.index > participationB.index ? 1 : -1;
    }
  );
};

export const findValidDuelTeamParticipation = (
  participations: DuelTeamParticipation[]
): DuelTeamParticipation | undefined => {
  const sortedParticipations = sortDuelTeamParticipations(participations);

  return sortedParticipations.find((participation) => !!participation.student);
};
