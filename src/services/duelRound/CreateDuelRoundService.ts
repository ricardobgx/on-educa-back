import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelRoundRequest } from '../../dto/duelRound/IDuelRoundRequest';
import { DuelRound } from '../../entities/DuelRound';
import { IDuelRoundRepository } from '../../repositories/interfaces/IDuelRoundRepository';

export class CreateDuelRoundService {
  duelRoundRepository: IDuelRoundRepository;

  constructor(duelRoundRepository: IDuelRoundRepository) {
    this.duelRoundRepository = duelRoundRepository;
  }

  async execute(duelRoundParams: IDuelRoundRequest): Promise<DuelRound> {
    const duelRoundRepository = getCustomRepository(
      this.duelRoundRepository as unknown as ObjectType<IDuelRoundRepository>
    );

    const duelRound = await duelRoundRepository.createDuelRound({
      ...duelRoundParams,
    });

    return duelRound;
  }
}
