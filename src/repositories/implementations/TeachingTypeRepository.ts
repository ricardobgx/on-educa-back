import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { ITeachingTypeRequest } from '../../dto/teachingType/ITeachingTypeRequest';
import { ICreateManyTeachingTypesRequest } from '../../dto/teachingType/ICreateManyTeachingTypesRequest';
import { TeachingType } from '../../entities/TeachingType';
import { ITeachingTypeRepository } from '../interfaces/ITeachingTypeRepository';
import { SchoolGradeRepository } from './SchoolGradeRepository';

@EntityRepository(TeachingType)
export class TeachingTypeRepository
  extends Repository<TeachingType>
  implements ITeachingTypeRepository
{
  async createTeachingType(
    teachingTypeParams: ITeachingTypeRequest
  ): Promise<TeachingType> {
    const { name, schoolGradeIndexes, subjectNames } = teachingTypeParams;

    const newTeachingTypeParams = this.create({ name });

    const teachingType = await this.save(newTeachingTypeParams);

    if (schoolGradeIndexes && subjectNames) {
      const schoolGradeRepository = await getCustomRepository(
        SchoolGradeRepository
      );

      await schoolGradeRepository.createManySchoolGrades({
        teachingTypeId: teachingType.id,
        schoolGradeIndexes,
        subjectNames,
      });
    }

    return teachingType;
  }
  async findAll(): Promise<TeachingType[]> {
    return await this.find({ relations: ['schoolGrades'] });
  }
  async findById(id: string): Promise<TeachingType> {
    return await this.findOne({ id }, { relations: ['schoolGrades'] });
  }
  async updateById(updateFields: ITeachingTypeRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async createManyTeachingTypes(
    createManyTeachingTypesParams: ICreateManyTeachingTypesRequest
  ): Promise<TeachingType[]> {
    const { teachingTypesParams } = createManyTeachingTypesParams;

    const teachingTypes: TeachingType[] = [];

    await Promise.all(
      teachingTypesParams.map(async (teachingTypeParams) => {
        const teachingType = await this.createTeachingType(teachingTypeParams);
        teachingTypes.push(teachingType);
      })
    );

    return teachingTypes;
  }
}
