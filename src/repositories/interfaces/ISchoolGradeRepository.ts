import { DeleteResult } from 'typeorm';
import { ISchoolGradeRequest } from '../../dto/schoolGrade/ISchoolGradeRequest';
import { ICreateManySchoolGradesRequest } from '../../dto/schoolGrade/ICreateManySchoolGradesRequest';
import { SchoolGrade } from '../../entities/SchoolGrade';

export interface ISchoolGradeRepository {
  createSchoolGrade(
    schoolGradeParams: ISchoolGradeRequest
  ): Promise<SchoolGrade>;
  createManySchoolGrades(
    createManySchoolGradesParams: ICreateManySchoolGradesRequest
  ): Promise<SchoolGrade[]>;
  findAll(): Promise<SchoolGrade[]>;
  findByTeachingType(teachingTypeId: string): Promise<SchoolGrade[]>;
  findById(id: string): Promise<SchoolGrade | undefined>;
  updateById(updateFields: ISchoolGradeRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
