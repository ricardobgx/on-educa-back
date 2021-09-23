import { IUserRequest } from "./IUserRequest";

export interface IStudentRequest extends IUserRequest {
  schoolGrade: number;
}