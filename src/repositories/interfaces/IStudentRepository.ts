import { DeleteResult } from "typeorm";
import { IStudentRequest } from "../../dto/IStudentRequest";
import { Student } from "../../entities/Student";

export interface IStudentRepository {
  createStudent(studentParams: IStudentRequest): Promise<Student>;
  findAll(): Promise<Student[]>;
  findByEmail(email: string): Promise<Student | undefined>;
  updateByEmail(updateFields: IStudentRequest): Promise<void>;
  deleteByEmail(email: string): Promise<DeleteResult>;
}