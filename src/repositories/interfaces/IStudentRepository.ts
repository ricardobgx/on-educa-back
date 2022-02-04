import { DeleteResult } from 'typeorm';
import { IStudentRequest } from '../../dto/IStudentRequest';
import { Student } from '../../entities/Student';

export interface IStudentRepository {
  createStudent(studentParams: IStudentRequest): Promise<Student>;
  findAll(): Promise<Student[]>;
  findById(id: string): Promise<Student | undefined>;
  findByPeopleId(peopleId: string): Promise<Student | undefined>;
  updateById(updateFields: IStudentRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
