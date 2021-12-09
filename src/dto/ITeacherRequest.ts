import { IUserRequest } from "./IUserRequest";

export interface ITeacherRequest extends IUserRequest {
  teachingTypeId?: string;
}