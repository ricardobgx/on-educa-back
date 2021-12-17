import { getCustomRepository, ObjectType } from "typeorm";
import { EntityName } from "../../entities/EntityName";
import { IEntityNameRepository } from "../../repositories/interfaces/IEntityNameRepository";

export class ListEntityNameService {
  entityNameRepository: IEntityNameRepository;

  constructor(entityNameRepository: IEntityNameRepository) {
    this.entityNameRepository = entityNameRepository;
  }

  async execute(): Promise<EntityName[]> {
    const entityNameRepository = getCustomRepository(this.entityNameRepository as unknown as ObjectType<IEntityNameRepository>);

    const entityNames = await entityNameRepository.findAll();

    return entityNames;
  }
}