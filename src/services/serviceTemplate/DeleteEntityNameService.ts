import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../errors";
import { IEntityNameRepository } from "../../repositories/interfaces/IEntityNameRepository";

export class DeleteEntityNameService {
  entityNameRepository: IEntityNameRepository;

  constructor(entityNameRepository: IEntityNameRepository) {
    this.entityNameRepository = entityNameRepository;
  }

  async execute(id: string): Promise<void> {
    const entityNameRepository = getCustomRepository(this.entityNameRepository as unknown as ObjectType<IEntityNameRepository>);

    const entityName = await entityNameRepository.findById(id);

    if (!entityName) throw new ApplicationErrors("Entidade não existe!", 404);

    await entityNameRepository.deleteById(id);
  }
}