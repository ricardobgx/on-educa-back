import { DeleteResult } from "typeorm";
import { IContentRequest } from "../../dto/IContentRequest";
import { Content } from "../../entities/Content";

export interface IContentRepository {
  createContent(contentParams: IContentRequest): Promise<Content>;
  findAll(): Promise<Content[]>;
  findById(id: string): Promise<Content | undefined>;
  updateById(updateFields: IContentRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}