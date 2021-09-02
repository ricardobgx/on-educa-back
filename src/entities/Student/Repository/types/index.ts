import { IUser } from '../../../User/Repository/types';

export interface IStudent extends IUser {
  schoolGrade: number;
}