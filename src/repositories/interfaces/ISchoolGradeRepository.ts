import { DeleteResult } from "typeorm";
import { ISchoolGradeRequest } from "../../dto/ISchoolGradeRequest";
import { SchoolGrade } from "../../entities/SchoolGrade";

export interface ISchoolGradeRepository {
  createSchoolGrade(schoolGradeParams: ISchoolGradeRequest): Promise<SchoolGrade>;
  findAll(): Promise<SchoolGrade[]>;
  findByTeachingType(teachingTypeId: string): Promise<SchoolGrade[]>;
  findById(id: string): Promise<SchoolGrade | undefined>;
  updateById(updateFields: ISchoolGradeRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}