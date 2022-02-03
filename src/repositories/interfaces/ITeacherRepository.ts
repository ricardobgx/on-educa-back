import { DeleteResult } from 'typeorm';
import { ITeacherRequest } from '../../dto/ITeacherRequest';
import { Teacher } from '../../entities/Teacher';

export interface ITeacherRepository {
  createTeacher(teacherParams: ITeacherRequest): Promise<Teacher>;
  findAll(): Promise<Teacher[]>;
  findById(id: string): Promise<Teacher | undefined>;
  updateById(updateFields: ITeacherRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
