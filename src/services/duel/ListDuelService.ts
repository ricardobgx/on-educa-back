import { getCustomRepository, ObjectType } from "typeorm";
import { Duel } from "../../entities/Duel";
import { IDuelRepository } from "../../repositories/interfaces/IDuelRepository";

export class ListDuelService {
  duelRepository: IDuelRepository;

  constructor(duelRepository: IDuelRepository) {
    this.duelRepository = duelRepository;
  }

  async execute(): Promise<Duel[]> {
    const duelRepository = getCustomRepository(this.duelRepository as unknown as ObjectType<IDuelRepository>);

    const duels = await duelRepository.findAll();

    return duels;
  }
}