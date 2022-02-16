import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelTeamRequest } from '../../dto/duelTeam/IDuelTeamRequest';
import { ApplicationErrors } from '../../errors';
import { IDuelTeamRepository } from '../../repositories/interfaces/IDuelTeamRepository';

export class UpdateDuelTeamService {
  duelTeamRepository: IDuelTeamRepository;

  constructor(duelTeamRepository: IDuelTeamRepository) {
    this.duelTeamRepository = duelTeamRepository;
  }

  async execute(duelTeamParams: IDuelTeamRequest): Promise<void> {
    const duelTeamRepository = getCustomRepository(
      this.duelTeamRepository as unknown as ObjectType<IDuelTeamRepository>
    );

    const duelTeam = await duelTeamRepository.findById(duelTeamParams.id);

    if (!duelTeam) throw new ApplicationErrors('Entidade não existe', 404);

    await duelTeamRepository.updateById(duelTeamParams);
  }
}
