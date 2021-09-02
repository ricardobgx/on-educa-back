import { IUserRequest } from "../../../../User/Services/Create/types";

export interface IStudentRequest extends IUserRequest {
  schoolGrade: number;
}