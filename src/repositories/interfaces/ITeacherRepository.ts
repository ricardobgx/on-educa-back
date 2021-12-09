import { DeleteResult } from "typeorm";
import { ITeacherRequest } from "../../dto/ITeacherRequest";
import { Teacher } from "../../entities/Teacher";

export interface ITeacherRepository {
  createTeacher(teacherParams: ITeacherRequest): Promise<Teacher>;
  findAll(): Promise<Teacher[]>;
  findById(id: string): Promise<Teacher | undefined>;
  findByEmail(email: string): Promise<Teacher | undefined>;
  updateByEmail(updateFields: ITeacherRequest): Promise<void>;
  deleteByEmail(email: string): Promise<DeleteResult>;
}