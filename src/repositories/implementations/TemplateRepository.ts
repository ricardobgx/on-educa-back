import {
  EntityRepository,
  Repository,
} from 'typeorm';
import ITemplateRequest from '../../dto/template/ITemplateRequest';
import Template from '../../entities/Template';
import { ITemplateRepository } from '../interfaces/ITemplateRepository';

@EntityRepository(Template)
export class TemplateRepository
  extends Repository<Template>
  implements ITemplateRepository
{
  async createTemplate(templateParams: ITemplateRequest): Promise<Template> {
    const template = this.create({});

    return await this.save(template);
  }

  async findAll(): Promise<Template[]> {
    return await this.find({
      relations: [],
    });
  }

  async findById(id: string): Promise<Template> {
    return await this.findOne(
      { id },
      {
        relations: [],
      }
    );
  }

  async updateById(updateFields: ITemplateRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<void> {
      await this.delete({ id });
  };
}
