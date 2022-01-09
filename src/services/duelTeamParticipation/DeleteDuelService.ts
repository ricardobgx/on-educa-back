import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../errors";
import { IDuelRepository } from "../../repositories/interfaces/IDuelRepository";

export class DeleteDuelService {
  duelRepository: IDuelRepository;

  constructor(duelRepository: IDuelRepository) {
    this.duelRepository = duelRepository;
  }

  async execute(id: string): Promise<void> {
    const duelRepository = getCustomRepository(this.duelRepository as unknown as ObjectType<IDuelRepository>);

    const duel = await duelRepository.findById(id);

    if (!duel) throw new ApplicationErrors("Entidade não existe!", 404);

    await duelRepository.deleteById(id);
  }
}