import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelRound } from '../../entities/DuelRound';
import { IDuelRoundRepository } from '../../repositories/interfaces/IDuelRoundRepository';

export class ListDuelRoundService {
  duelRoundRepository: IDuelRoundRepository;

  constructor(duelRoundRepository: IDuelRoundRepository) {
    this.duelRoundRepository = duelRoundRepository;
  }

  async execute(): Promise<DuelRound[]> {
    const duelRoundRepository = getCustomRepository(
      this.duelRoundRepository as unknown as ObjectType<IDuelRoundRepository>
    );

    const duelRounds = await duelRoundRepository.findAll();

    return duelRounds;
  }
}
