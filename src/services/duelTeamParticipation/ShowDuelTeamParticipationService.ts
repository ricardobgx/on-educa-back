import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { ApplicationErrors } from '../../errors';
import { IDuelTeamParticipationRepository } from '../../repositories/interfaces/IDuelTeamParticipationRepository';

export class ShowDuelTeamParticipationService {
  duelTeamParticipationRepository: IDuelTeamParticipationRepository;

  constructor(
    duelTeamParticipationRepository: IDuelTeamParticipationRepository
  ) {
    this.duelTeamParticipationRepository = duelTeamParticipationRepository;
  }

  async execute(id: string): Promise<DuelTeamParticipation> {
    const duelTeamParticipationRepository = getCustomRepository(
      this
        .duelTeamParticipationRepository as unknown as ObjectType<IDuelTeamParticipationRepository>
    );

    const duelTeamParticipation =
      await duelTeamParticipationRepository.findById(id);

    if (!duelTeamParticipation)
      throw new ApplicationErrors('Entidade não existe', 404);

    return duelTeamParticipation;
  }
}
