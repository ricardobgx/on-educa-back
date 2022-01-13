import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelRoundRequest } from '../../dto/IDuelRoundRequest';
import { ApplicationErrors } from '../../errors';
import { IDuelRoundRepository } from '../../repositories/interfaces/IDuelRoundRepository';

export class StartDuelRoundService {
  duelRoundRepository: IDuelRoundRepository;

  constructor(duelRoundRepository: IDuelRoundRepository) {
    this.duelRoundRepository = duelRoundRepository;
  }

  async execute(duelRoundId: string): Promise<void> {
    const duelRoundRepository = getCustomRepository(
      this.duelRoundRepository as unknown as ObjectType<IDuelRoundRepository>
    );

    const duelRound = await duelRoundRepository.findById(duelRoundId);

    if (!duelRound) throw new ApplicationErrors('Entidade não existe', 404);

    await duelRoundRepository.startDuelRound(duelRoundId);
  }
}
