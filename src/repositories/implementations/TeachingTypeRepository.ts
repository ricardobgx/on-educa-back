import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { ITeachingTypeRequest } from "../../dto/ITeachingTypeRequest";
import { TeachingType } from "../../entities/TeachingType";
import { ITeachingTypeRepository } from "../interfaces/ITeachingTypeRepository";

@EntityRepository(TeachingType)
export class TeachingTypeRepository extends Repository<TeachingType> implements ITeachingTypeRepository {
  async createTeachingType(teachingTypeParams: ITeachingTypeRequest): Promise<TeachingType> {
    const teachingType = await this.save(teachingTypeParams);

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
    const fields = {...updateFields};

    Object.keys(fields).map(
      key => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }
}