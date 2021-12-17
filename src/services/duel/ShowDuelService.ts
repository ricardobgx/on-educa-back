import { getCustomRepository, ObjectType } from "typeorm";
import { Duel } from "../../entities/Duel";
import { ApplicationErrors } from "../../errors";
import { IDuelRepository } from "../../repositories/interfaces/IDuelRepository";

export class ShowDuelService {
  duelRepository: IDuelRepository;

  constructor(duelRepository: IDuelRepository) {
    this.duelRepository = duelRepository;
  }

  async execute(id: string): Promise<Duel> {
    const duelRepository = getCustomRepository(this.duelRepository as unknown as ObjectType<IDuelRepository>);

    const duel = await duelRepository.findById(id);

    if (!duel) throw new ApplicationErrors("Entidade não existe", 404);

    return duel;
  }
}