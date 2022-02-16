import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { ISchoolGradeRequest } from '../../dto/schoolGrade/ISchoolGradeRequest';
import { ICreateManySchoolGradesRequest } from '../../dto/schoolGrade/ICreateManySchoolGradesRequest';
import { SchoolGrade } from '../../entities/SchoolGrade';
import { ApplicationErrors } from '../../errors';
import { ISchoolGradeRepository } from '../interfaces/ISchoolGradeRepository';
import { SubjectRepository } from './SubjectRepository';
import { TeachingTypeRepository } from './TeachingTypeRepository';

@EntityRepository(SchoolGrade)
export class SchoolGradeRepository
  extends Repository<SchoolGrade>
  implements ISchoolGradeRepository
{
  async createSchoolGrade(
    schoolGradeParams: ISchoolGradeRequest
  ): Promise<SchoolGrade> {
    const { index, teachingTypeId, subjectNames } = schoolGradeParams;

    if (!teachingTypeId) {
      throw new ApplicationErrors('Ensino não informado', 400);
    }

    const teachingTypeRepository = getCustomRepository(TeachingTypeRepository);
    const teachingType = await teachingTypeRepository.findById(teachingTypeId);

    if (!teachingType) {
      throw new ApplicationErrors('Ensino não encontrado', 404);
    }

    const newSchoolGradeParams = this.create({ index, teachingType });

    const schoolGrade = await this.save(newSchoolGradeParams);

    if (subjectNames) {
      const subjectRepository = await getCustomRepository(SubjectRepository);
      await subjectRepository.createManySubjects({
        schoolGradeId: schoolGrade.id,
        names: subjectNames,
      });
    }

    return schoolGrade;
  }

  async createManySchoolGrades(
    createManySchoolGradesParams: ICreateManySchoolGradesRequest
  ): Promise<SchoolGrade[]> {
    const { teachingTypeId, schoolGradeIndexes, subjectNames } =
      createManySchoolGradesParams;

    const schoolGrades: SchoolGrade[] = [];

    await Promise.all(
      schoolGradeIndexes.map(async (schoolGradeIndex) => {
        const schoolGrade = await this.createSchoolGrade({
          teachingTypeId,
          index: schoolGradeIndex,
          subjectNames,
        });
        schoolGrades.push(schoolGrade);
      })
    );

    return schoolGrades;
  }

  async findAll(): Promise<SchoolGrade[]> {
    return await this.find({ relations: ['subjects', 'teachingType'] });
  }
  async findByTeachingType(teachingTypeId: string): Promise<SchoolGrade[]> {
    const teachingTypeRepository = getCustomRepository(TeachingTypeRepository);
    const teachingType = await teachingTypeRepository.findById(teachingTypeId);

    const schoolGrades = await this.find({
      where: { teachingType },
      relations: ['teachingType', 'subjects'],
    });

    return schoolGrades;
  }
  async findById(id: string): Promise<SchoolGrade> {
    return await this.findOne(
      { id },
      { relations: ['subjects', 'teachingType'] }
    );
  }
  async updateById(updateFields: ISchoolGradeRequest): Promise<void> {
    const { id } = updateFields;

    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }
  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
