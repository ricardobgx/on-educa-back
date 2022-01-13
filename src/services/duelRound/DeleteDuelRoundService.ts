import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IDuelRoundRepository } from '../../repositories/interfaces/IDuelRoundRepository';

export class DeleteDuelRoundService {
  duelRoundRepository: IDuelRoundRepository;

  constructor(duelRoundRepository: IDuelRoundRepository) {
    this.duelRoundRepository = duelRoundRepository;
  }

  async execute(id: string): Promise<void> {
    const duelRoundRepository = getCustomRepository(
      this.duelRoundRepository as unknown as ObjectType<IDuelRoundRepository>
    );

    const duelRound = await duelRoundRepository.findById(id);

    if (!duelRound) throw new ApplicationErrors('Entidade não existe!', 404);

    await duelRoundRepository.deleteById(id);
  }
}
