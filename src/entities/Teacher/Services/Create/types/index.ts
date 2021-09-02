import Subject from "../../../../Subject/Entity";
import { IUserRequest } from "../../../../User/Services/Create/types";

export interface ITeacherRequest extends IUserRequest {
  subjects: Subject[];
}