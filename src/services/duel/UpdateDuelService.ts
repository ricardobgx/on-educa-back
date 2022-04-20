import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelRequest } from '../../dto/duel/IDuelRequest';
import { ApplicationErrors } from '../../errors';
import { IDuelRepository } from '../../repositories/interfaces/IDuelRepository';

export class UpdateDuelService {
  duelRepository: IDuelRepository;

  constructor(duelRepository: IDuelRepository) {
    this.duelRepository = duelRepository;
  }

  async execute(duelParams: IDuelRequest): Promise<void> {
    const duelRepository = getCustomRepository(
      this.duelRepository as unknown as ObjectType<IDuelRepository>
    );

    const duel = await duelRepository.findById(duelParams.id);

    if (!duel) throw new ApplicationErrors('Disciplina não existe', 404);

    await duelRepository.updateById(duelParams);
  }
}
