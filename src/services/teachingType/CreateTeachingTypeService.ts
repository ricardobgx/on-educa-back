import { getCustomRepository, ObjectType } from 'typeorm';
import { ITeachingTypeRequest } from '../../dto/teachingType/ITeachingTypeRequest';
import { TeachingType } from '../../entities/TeachingType';
import { ITeachingTypeRepository } from '../../repositories/interfaces/ITeachingTypeRepository';

export class CreateTeachingTypeService {
  teachingTypeRepository: ITeachingTypeRepository;

  constructor(teachingTypeRepository: ITeachingTypeRepository) {
    this.teachingTypeRepository = teachingTypeRepository;
  }

  async execute(
    teachingTypeParams: ITeachingTypeRequest
  ): Promise<TeachingType> {
    const teachingTypeRepository = getCustomRepository(
      this
        .teachingTypeRepository as unknown as ObjectType<ITeachingTypeRepository>
    );

    const teachingType = await teachingTypeRepository.createTeachingType(
      teachingTypeParams
    );

    return teachingType;
  }
}
