import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { IDuelTeamParticipationRepository } from '../../repositories/interfaces/IDuelTeamParticipationRepository';

export class ListDuelTeamParticipationByDuelTeamService {
  duelTeamParticipationRepository: IDuelTeamParticipationRepository;

  constructor(
    duelTeamParticipationRepository: IDuelTeamParticipationRepository
  ) {
    this.duelTeamParticipationRepository = duelTeamParticipationRepository;
  }

  async execute(id: string): Promise<DuelTeamParticipation[]> {
    const duelTeamParticipationRepository = getCustomRepository(
      this
        .duelTeamParticipationRepository as unknown as ObjectType<IDuelTeamParticipationRepository>
    );

    const duelTeamParticipations =
      await duelTeamParticipationRepository.findByDuelTeam(id);

    return duelTeamParticipations;
  }
}
