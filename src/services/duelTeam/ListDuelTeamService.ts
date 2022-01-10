import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelTeam } from '../../entities/DuelTeam';
import { IDuelTeamRepository } from '../../repositories/interfaces/IDuelTeamRepository';

export class ListDuelTeamService {
  duelTeamRepository: IDuelTeamRepository;

  constructor(duelTeamRepository: IDuelTeamRepository) {
    this.duelTeamRepository = duelTeamRepository;
  }

  async execute(): Promise<DuelTeam[]> {
    const duelTeamRepository = getCustomRepository(
      this.duelTeamRepository as unknown as ObjectType<IDuelTeamRepository>
    );

    const duelTeams = await duelTeamRepository.findAll();

    return duelTeams;
  }
}
