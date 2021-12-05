import { DeleteResult } from "typeorm";
import { IManySubjects } from "../../dto/IManySubjects";
import { ISubjectRequest } from "../../dto/ISubjectRequest";
import { Subject } from "../../entities/Subject";

export interface ISubjectRepository {
  createSubject(subjectParams: ISubjectRequest): Promise<Subject>;
  createManySubjects(subjectParams: IManySubjects): Promise<Subject[]>;
  findAll(): Promise<Subject[]>;
  findBySchoolGrade(schoolGradeId: string): Promise<Subject[]>;
  findById(id: string): Promise<Subject | undefined>;
  updateById(updateFields: ISubjectRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}