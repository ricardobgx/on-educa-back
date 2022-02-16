import { getCustomRepository, ObjectType } from 'typeorm';
import { ICreateManyTeachingTypesRequest } from '../../dto/teachingType/ICreateManyTeachingTypesRequest';
import { ITeachingTypeRequest } from '../../dto/teachingType/ITeachingTypeRequest';
import { TeachingType } from '../../entities/TeachingType';
import { ITeachingTypeRepository } from '../../repositories/interfaces/ITeachingTypeRepository';

export class CreateManyTeachingTypesService {
  teachingTypeRepository: ITeachingTypeRepository;

  constructor(teachingTypeRepository: ITeachingTypeRepository) {
    this.teachingTypeRepository = teachingTypeRepository;
  }

  async execute(
    createManyTeachingTypesParams: ICreateManyTeachingTypesRequest
  ): Promise<TeachingType[]> {
    const teachingTypeRepository = getCustomRepository(
      this
        .teachingTypeRepository as unknown as ObjectType<ITeachingTypeRepository>
    );

    const teachingTypes = await teachingTypeRepository.createManyTeachingTypes(
      createManyTeachingTypesParams
    );

    return teachingTypes;
  }
}
