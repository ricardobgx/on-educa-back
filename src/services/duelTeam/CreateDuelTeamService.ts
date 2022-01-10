import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelTeamRequest } from '../../dto/IDuelTeamRequest';
import { DuelTeam } from '../../entities/DuelTeam';
import { IDuelTeamRepository } from '../../repositories/interfaces/IDuelTeamRepository';

export class CreateDuelTeamService {
  duelTeamRepository: IDuelTeamRepository;

  constructor(duelTeamRepository: IDuelTeamRepository) {
    this.duelTeamRepository = duelTeamRepository;
  }

  async execute(duelTeamParams: IDuelTeamRequest): Promise<DuelTeam> {
    const duelTeamRepository = getCustomRepository(
      this.duelTeamRepository as unknown as ObjectType<IDuelTeamRepository>
    );

    const duelTeam = await duelTeamRepository.createDuelTeam(duelTeamParams);

    return duelTeam;
  }
}
