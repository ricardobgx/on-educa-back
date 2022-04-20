import { ITeachingTypeRequest } from '../../dto/teachingType/ITeachingTypeRequest';
import { ICreateManyTeachingTypesRequest } from '../../dto/teachingType/ICreateManyTeachingTypesRequest';
import { TeachingType } from '../../entities/TeachingType';

export interface ITeachingTypeRepository {
  createTeachingType(
    teachingTypeParams: ITeachingTypeRequest
  ): Promise<TeachingType>;
  createManyTeachingTypes(
    createManyTeachingTypesParams: ICreateManyTeachingTypesRequest
  ): Promise<TeachingType[]>;
  findAll(): Promise<TeachingType[]>;
  findById(id: string): Promise<TeachingType | undefined>;
  updateById(updateFields: ITeachingTypeRequest): Promise<void>;
}
