import { getCustomRepository, ObjectType } from "typeorm";
import { IEntityNameRequest } from "../../dto/IEntityNameRequest";
import { ApplicationErrors } from "../../errors";
import { IEntityNameRepository } from "../../repositories/interfaces/IEntityNameRepository";

export class UpdateEntityNameService {
  entityNameRepository: IEntityNameRepository;

  constructor(entityNameRepository: IEntityNameRepository) {
    this.entityNameRepository = entityNameRepository;
  }

  async execute(entityNameParams: IEntityNameRequest): Promise<void> {
    const entityNameRepository = getCustomRepository(this.entityNameRepository as unknown as ObjectType<IEntityNameRepository>);

    const entityName = await entityNameRepository.findById(entityNameParams.id);

    if (!entityName) throw new ApplicationErrors("Disciplina não existe", 404);

    await entityNameRepository.updateById(entityNameParams);
  }
}