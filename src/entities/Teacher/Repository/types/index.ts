import Subject from '../../../Subject/Entity';
import { IUser } from '../../../User/Repository/types';

export interface ITeacher extends IUser {
  subjects: Subject[];
}