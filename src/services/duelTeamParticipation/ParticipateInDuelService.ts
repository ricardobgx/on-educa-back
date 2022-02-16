import { getCustomRepository, ObjectType } from 'typeorm';
import { IParticipateInDuelRequest } from '../../dto/duel/IParticipateInDuelRequest';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { IDuelTeamParticipationRepository } from '../../repositories/interfaces/IDuelTeamParticipationRepository';

export class ParticipateInDuelService {
  duelTeamParticipationRepository: IDuelTeamParticipationRepository;

  constructor(
    duelTeamParticipationRepository: IDuelTeamParticipationRepository
  ) {
    this.duelTeamParticipationRepository = duelTeamParticipationRepository;
  }

  async execute(
    participateInDuelParams: IParticipateInDuelRequest
  ): Promise<DuelTeamParticipation> {
    const duelTeamParticipationRepository = getCustomRepository(
      this
        .duelTeamParticipationRepository as unknown as ObjectType<IDuelTeamParticipationRepository>
    );

    const duelTeamParticipation =
      await duelTeamParticipationRepository.participateInDuel(
        participateInDuelParams
      );

    return duelTeamParticipation;
  }
}
