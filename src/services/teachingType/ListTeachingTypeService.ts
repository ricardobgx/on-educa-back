import { getCustomRepository, ObjectType } from "typeorm";
import { TeachingType } from "../../entities/TeachingType";
import { ITeachingTypeRepository } from "../../repositories/interfaces/ITeachingTypeRepository";

export class ListTeachingTypeService {
  teachingTypeRepository: ITeachingTypeRepository;

  constructor(teachingTypeRepository: ITeachingTypeRepository) {
    this.teachingTypeRepository = teachingTypeRepository;
  }

  async execute(): Promise<TeachingType[]> {
    const teachingTypeRepository = getCustomRepository(this.teachingTypeRepository as unknown as ObjectType<ITeachingTypeRepository>);

    const teachingTypes = await teachingTypeRepository.findAll();
    
    return teachingTypes;
  }
}