import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IDuelTeamRepository } from '../../repositories/interfaces/IDuelTeamRepository';

export class DeleteDuelTeamService {
  duelTeamRepository: IDuelTeamRepository;

  constructor(duelTeamRepository: IDuelTeamRepository) {
    this.duelTeamRepository = duelTeamRepository;
  }

  async execute(id: string): Promise<void> {
    const duelTeamRepository = getCustomRepository(
      this.duelTeamRepository as unknown as ObjectType<IDuelTeamRepository>
    );

    const duelTeam = await duelTeamRepository.findById(id);

    if (!duelTeam) throw new ApplicationErrors('Entidade não existe!', 404);

    await duelTeamRepository.deleteById(id);
  }
}
