import ITemplateRequest from '../../dto/template/ITemplateRequest';
import Template from '../../entities/Template';

export interface ITemplateRepository {
  createTemplate(templateParams: ITemplateRequest): Promise<Template>;
  findAll(): Promise<Template[]>;
  findById(id: string): Promise<Template | undefined>;
  updateById(updateFields: ITemplateRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
