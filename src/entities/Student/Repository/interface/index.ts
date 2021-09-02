import Student from "../../Entity";
import { IStudent } from "../types";

export default interface IStudentRepository {
  createStudent(studentParams: IStudent): Promise<Student>;
  
  findAll(): Promise<Student[]>;
  
  findByEmail(email: string): Promise<Student>;
  
  updateByEmail(studentParams: IStudent): Promise<void>;
  
  deleteByEmail(email: string): Promise<void>;
}