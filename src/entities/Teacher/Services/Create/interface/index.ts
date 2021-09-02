import Teacher from "../../../Entity";
import ITeacherRepository from "../../../Repository/interface";
import { ITeacherRequest } from "../types";

export default interface ICreateTeacherService {
  teacherRepository: ITeacherRepository;
  execute(teacherParams: ITeacherRequest): Promise<Teacher | null>;
}