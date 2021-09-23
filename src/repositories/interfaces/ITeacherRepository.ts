import { DeleteResult } from "typeorm";
import { ITeacherRequest } from "../../dto/ITeacherRequest";
import { Teacher } from "../../entities/Teacher";

export interface ITeacherRepository {
  createTeacher(teacherParams: ITeacherRequest): Promise<Teacher>;
  findAll(): Promise<Teacher[]>;
  findByEmail(email: string): Promise<Teacher | null>;
  updateByEmail(updateFields: ITeacherRequest): Promise<void>;
  deleteByEmail(email: string): Promise<DeleteResult>;
}