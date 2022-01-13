import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelRoundRequest } from '../../dto/IDuelRoundRequest';
import { ApplicationErrors } from '../../errors';
import { IDuelRoundRepository } from '../../repositories/interfaces/IDuelRoundRepository';

export class UpdateDuelRoundService {
  duelRoundRepository: IDuelRoundRepository;

  constructor(duelRoundRepository: IDuelRoundRepository) {
    this.duelRoundRepository = duelRoundRepository;
  }

  async execute(duelRoundParams: IDuelRoundRequest): Promise<void> {
    const duelRoundRepository = getCustomRepository(
      this.duelRoundRepository as unknown as ObjectType<IDuelRoundRepository>
    );

    const duelRound = await duelRoundRepository.findById(duelRoundParams.id);

    if (!duelRound) throw new ApplicationErrors('Disciplina não existe', 404);

    await duelRoundRepository.updateById(duelRoundParams);
  }
}
