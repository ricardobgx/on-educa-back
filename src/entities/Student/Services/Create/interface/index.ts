import Student from "../../../Entity";
import IStudentRepository from "../../../Repository/interface";
import { IStudentRequest } from "../types";

export default interface ICreateStudentService {
  studentRepository: IStudentRepository;
  execute(studentParams: IStudentRequest): Promise<Student | null>;
}