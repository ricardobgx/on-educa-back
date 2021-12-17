import { hash } from "bcryptjs";
import { getCustomRepository, ObjectType } from "typeorm";
import { IEntityNameRequest } from "../../dto/IEntityNameRequest";
import { EntityName } from "../../entities/EntityName";
import { IEntityNameRepository } from "../../repositories/interfaces/IEntityNameRepository";

export class CreateEntityNameService {
  entityNameRepository: IEntityNameRepository;

  constructor(entityNameRepository: IEntityNameRepository) {
    this.entityNameRepository = entityNameRepository;
  }

  async execute(entityNameParams: IEntityNameRequest): Promise<EntityName> {
    const entityNameRepository = getCustomRepository(this.entityNameRepository as unknown as ObjectType<IEntityNameRepository>);

    const entityName = await entityNameRepository.createEntityName(entityNameParams);

    return entityName;
  }
}