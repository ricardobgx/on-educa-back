import { getCustomRepository, ObjectType } from "typeorm";
import { IDuelRequest } from "../../dto/IDuelRequest";
import { Duel } from "../../entities/Duel";
import { IDuelRepository } from "../../repositories/interfaces/IDuelRepository";

export class CreateDuelService {
  duelRepository: IDuelRepository;

  constructor(duelRepository: IDuelRepository) {
    this.duelRepository = duelRepository;
  }

  async execute(duelParams: IDuelRequest): Promise<Duel> {
    const duelRepository = getCustomRepository(this.duelRepository as unknown as ObjectType<IDuelRepository>);

    const duel = await duelRepository.createDuel(duelParams);

    return duel;
  }
}