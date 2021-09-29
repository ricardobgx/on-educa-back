import { Subject } from "../entities/Subject";
import { IUserRequest } from "./IUserRequest";

export interface ITeacherRequest extends IUserRequest {
  subjects: Subject[];
}