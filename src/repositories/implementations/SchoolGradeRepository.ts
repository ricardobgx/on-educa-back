import { DeleteResult, EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ISchoolGradeRequest } from "../../dto/ISchoolGradeRequest";
import { SchoolGrade } from "../../entities/SchoolGrade";
import { ISchoolGradeRepository } from "../interfaces/ISchoolGradeRepository";
import { TeachingTypeRepository } from "./TeachingTypeRepository";

@EntityRepository(SchoolGrade)
export class SchoolGradeRepository extends Repository<SchoolGrade> implements ISchoolGradeRepository {
  async createSchoolGrade(schoolGradeParams: ISchoolGradeRequest): Promise<SchoolGrade> {
    const { index, teachingTypeId } = schoolGradeParams;
    
    const teachingTypeRepository = getCustomRepository(TeachingTypeRepository);
    const teachingType = await teachingTypeRepository.findById(teachingTypeId);

    const newSchoolGradeParams = this.create({ index, teachingType });

    const schoolGrade  = await this.save(newSchoolGradeParams);

    return schoolGrade;
  }
  async findAll(): Promise<SchoolGrade[]> {
    return await this.find({ relations: ['subjects', 'teachingType'] });
  }
  async findByTeachingType(teachingTypeId: string): Promise<SchoolGrade[]> {
    const teachingTypeRepository = getCustomRepository(TeachingTypeRepository);
    const teachingType = await teachingTypeRepository.findById(teachingTypeId);

    const schoolGrades = await this.find({ where: { teachingType }, relations: ['teachingType', 'subjects'] });

    return schoolGrades;
  }
  async findById(id: string): Promise<SchoolGrade> {
    return await this.findOne({ id }, { relations: ['subjects', 'teachingType'] });
  }
  async updateById(updateFields: ISchoolGradeRequest): Promise<void> {
    const { id } = updateFields;

    const fields = {...updateFields};

    Object.keys(fields).map(
      key => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }
  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}