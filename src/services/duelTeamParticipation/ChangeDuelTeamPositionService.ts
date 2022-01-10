import { getCustomRepository, ObjectType } from 'typeorm';
import { IChangeDuelTeamPositionRequest } from '../../dto/IChangeDuelTeamPositionRequest';
import { IParticipateInDuelRequest } from '../../dto/IParticipateInDuelRequest';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { IDuelTeamParticipationRepository } from '../../repositories/interfaces/IDuelTeamParticipationRepository';

export class ChangeDuelTeamPositionService {
  duelTeamParticipationRepository: IDuelTeamParticipationRepository;

  constructor(
    duelTeamParticipationRepository: IDuelTeamParticipationRepository
  ) {
    this.duelTeamParticipationRepository = duelTeamParticipationRepository;
  }

  async execute(
    changeDuelTeamPositionParams: IChangeDuelTeamPositionRequest
  ): Promise<void> {
    const duelTeamParticipationRepository = getCustomRepository(
      this
        .duelTeamParticipationRepository as unknown as ObjectType<IDuelTeamParticipationRepository>
    );

    await duelTeamParticipationRepository.changeDuelTeamPosition(
      changeDuelTeamPositionParams
    );
  }
}
