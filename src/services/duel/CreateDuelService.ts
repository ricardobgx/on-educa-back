import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelRequest } from '../../dto/IDuelRequest';
import { Duel } from '../../entities/Duel';
import { generateDuelCode } from '../../functions/utils';
import { IDuelRepository } from '../../repositories/interfaces/IDuelRepository';

export class CreateDuelService {
  duelRepository: IDuelRepository;

  constructor(duelRepository: IDuelRepository) {
    this.duelRepository = duelRepository;
  }

  async execute(duelParams: IDuelRequest): Promise<Duel> {
    const duelRepository = getCustomRepository(
      this.duelRepository as unknown as ObjectType<IDuelRepository>
    );

    let codeExists = true;
    let code = '';

    do {
      code = generateDuelCode(6);
      codeExists = false;

      await duelRepository.findByCode(code).then((duels) => {
        if (duels.length > 0) {
          codeExists = true;
        }
      });
    } while (codeExists);

    const duel = await duelRepository.createDuel({ ...duelParams, code });

    return duel;
  }
}
