import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelTeamParticipationByDuelRequest } from '../../dto/IDuelTeamParticipationByDuelRequest';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { IDuelTeamParticipationRepository } from '../../repositories/interfaces/IDuelTeamParticipationRepository';

export class CreateDuelTeamParticipationByDuelService {
  duelTeamParticipationRepository: IDuelTeamParticipationRepository;

  constructor(
    duelTeamParticipationRepository: IDuelTeamParticipationRepository
  ) {
    this.duelTeamParticipationRepository = duelTeamParticipationRepository;
  }

  async execute(
    duelTeamParticipationByDuelParams: IDuelTeamParticipationByDuelRequest
  ): Promise<DuelTeamParticipation> {
    const duelTeamParticipationRepository = getCustomRepository(
      this
        .duelTeamParticipationRepository as unknown as ObjectType<IDuelTeamParticipationRepository>
    );

    const duelTeamParticipation =
      await duelTeamParticipationRepository.createDuelTeamParticipationByDuelId(
        duelTeamParticipationByDuelParams
      );

    return duelTeamParticipation;
  }
}
