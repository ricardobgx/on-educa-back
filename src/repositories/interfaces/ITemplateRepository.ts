import { DeleteResult } from 'typeorm';
import { ITemplateRequest } from '../../dto/ITemplateRequest';
import { Template } from '../../entities/Template';

export interface ITemplateRepository {
  createTemplate(templateParams: ITemplateRequest): Promise<Template>;
  findAll(name?: string): Promise<Template[]>;
  findById(id: string): Promise<Template | undefined>;
  updateById(updateFields: ITemplateRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
