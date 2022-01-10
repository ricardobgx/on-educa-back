import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelTeam } from '../../entities/DuelTeam';
import { IDuelTeamRepository } from '../../repositories/interfaces/IDuelTeamRepository';

export class ListDuelTeamByDuelRoundService {
  duelTeamRepository: IDuelTeamRepository;

  constructor(duelTeamRepository: IDuelTeamRepository) {
    this.duelTeamRepository = duelTeamRepository;
  }

  async execute(id: string): Promise<DuelTeam[]> {
    const duelTeamRepository = getCustomRepository(
      this.duelTeamRepository as unknown as ObjectType<IDuelTeamRepository>
    );

    const duelTeams = await duelTeamRepository.findByDuelRoundId(id);

    return duelTeams;
  }
}
