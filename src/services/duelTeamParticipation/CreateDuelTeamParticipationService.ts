import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelTeamParticipationRequest } from '../../dto/duelTeamParticipation/IDuelTeamParticipationRequest';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { IDuelTeamParticipationRepository } from '../../repositories/interfaces/IDuelTeamParticipationRepository';

export class CreateDuelTeamParticipationService {
  duelTeamParticipationRepository: IDuelTeamParticipationRepository;

  constructor(
    duelTeamParticipationRepository: IDuelTeamParticipationRepository
  ) {
    this.duelTeamParticipationRepository = duelTeamParticipationRepository;
  }

  async execute(
    duelTeamParticipationParams: IDuelTeamParticipationRequest
  ): Promise<DuelTeamParticipation> {
    const duelTeamParticipationRepository = getCustomRepository(
      this
        .duelTeamParticipationRepository as unknown as ObjectType<IDuelTeamParticipationRepository>
    );

    const duelTeamParticipation =
      await duelTeamParticipationRepository.createDuelTeamParticipation(
        duelTeamParticipationParams
      );

    return duelTeamParticipation;
  }
}
