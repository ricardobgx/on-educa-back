import { DeleteResult } from "typeorm";
import { ITeachingTypeRequest } from "../../dto/ITeachingTypeRequest";
import { TeachingType } from "../../entities/TeachingType";

export interface ITeachingTypeRepository {
  createTeachingType(teachingTypeParams: ITeachingTypeRequest): Promise<TeachingType>;
  findAll(): Promise<TeachingType[]>;
  findById(id: string): Promise<TeachingType | undefined>;
  updateById(updateFields: ITeachingTypeRequest): Promise<void>;
}