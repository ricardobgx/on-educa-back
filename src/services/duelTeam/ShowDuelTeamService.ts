import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelTeam } from '../../entities/DuelTeam';
import { ApplicationErrors } from '../../errors';
import { IDuelTeamRepository } from '../../repositories/interfaces/IDuelTeamRepository';

export class ShowDuelTeamService {
  duelTeamRepository: IDuelTeamRepository;

  constructor(duelTeamRepository: IDuelTeamRepository) {
    this.duelTeamRepository = duelTeamRepository;
  }

  async execute(id: string): Promise<DuelTeam> {
    const duelTeamRepository = getCustomRepository(
      this.duelTeamRepository as unknown as ObjectType<IDuelTeamRepository>
    );

    const duelTeam = await duelTeamRepository.findById(id);

    if (!duelTeam) throw new ApplicationErrors('Entidade não existe', 404);

    return duelTeam;
  }
}
