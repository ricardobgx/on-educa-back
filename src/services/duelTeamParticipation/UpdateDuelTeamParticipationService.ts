import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelTeamParticipationRequest } from '../../dto/duelTeamParticipation/IDuelTeamParticipationRequest';
import { ApplicationErrors } from '../../errors';
import { IDuelTeamParticipationRepository } from '../../repositories/interfaces/IDuelTeamParticipationRepository';

export class UpdateDuelTeamParticipationService {
  duelTeamParticipationRepository: IDuelTeamParticipationRepository;

  constructor(
    duelTeamParticipationRepository: IDuelTeamParticipationRepository
  ) {
    this.duelTeamParticipationRepository = duelTeamParticipationRepository;
  }

  async execute(
    duelTeamParticipationParams: IDuelTeamParticipationRequest
  ): Promise<void> {
    const duelTeamParticipationRepository = getCustomRepository(
      this
        .duelTeamParticipationRepository as unknown as ObjectType<IDuelTeamParticipationRepository>
    );

    const duelTeamParticipation =
      await duelTeamParticipationRepository.findById(
        duelTeamParticipationParams.id
      );

    if (!duelTeamParticipation)
      throw new ApplicationErrors('Entidade não existe', 404);

    await duelTeamParticipationRepository.updateById(
      duelTeamParticipationParams
    );
  }
}
