import { DeleteResult } from "typeorm";
import { ISubjectRequest } from "../../dto/ISubjectRequest";
import { Subject } from "../../entities/Subject";

export interface ISubjectRepository {
  createSubject(subjectParams: ISubjectRequest): Promise<Subject>;
  findAll(): Promise<Subject[]>;
  findById(id: string): Promise<Subject | undefined>;
  updateById(updateFields: ISubjectRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}