import Teacher from "../../Entity";
import { ITeacher } from "../types";

export default interface ITeacherRepository {
  createTeacher(teacherParams: ITeacher): Promise<Teacher>;
  
  findAll(): Promise<Teacher[]>;
  
  findByEmail(email: string): Promise<Teacher>;
  
  updateByEmail(teacherParams: ITeacher): Promise<void>;
  
  deleteByEmail(email: string): Promise<void>;
}