import { getCustomRepository, ObjectType } from "typeorm";
import { EntityName } from "../../entities/EntityName";
import { ApplicationErrors } from "../../errors";
import { IEntityNameRepository } from "../../repositories/interfaces/IEntityNameRepository";

export class ShowEntityNameService {
  entityNameRepository: IEntityNameRepository;

  constructor(entityNameRepository: IEntityNameRepository) {
    this.entityNameRepository = entityNameRepository;
  }

  async execute(id: string): Promise<EntityName> {
    const entityNameRepository = getCustomRepository(this.entityNameRepository as unknown as ObjectType<IEntityNameRepository>);

    const entityName = await entityNameRepository.findById(id);

    if (!entityName) throw new ApplicationErrors("Entidade não existe", 404);

    return entityName;
  }
}