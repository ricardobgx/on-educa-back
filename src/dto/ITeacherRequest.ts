import { IUserRequest } from "./IUserRequest";

export interface ITeacherRequest extends IUserRequest {
  subjects: ISubject[];
}

interface ISubject {
  id: string;
}