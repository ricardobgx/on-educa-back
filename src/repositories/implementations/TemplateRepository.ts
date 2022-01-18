import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { ITemplateRequest } from '../../dto/ITemplateRequest';
import { Template } from '../../entities/Template';
import { ApplicationErrors } from '../../errors';
import { ITemplateRepository } from '../interfaces/ITemplateRepository';

@EntityRepository(Template)
export class TemplateRepository
  extends Repository<Template>
  implements ITemplateRepository
{
  async createTemplate(templateParams: ITemplateRequest): Promise<Template> {
    // Salva a pratica na base de dados e retorna
    return await this.save({ ...templateParams });
  }

  async findAll(): Promise<Template[]> {
    return await this.find({
      relations: [],
    });
  }

  async findById(id: string): Promise<Template | undefined> {
    const Template = await this.findOne({ id }, { relations: [] });

    return Template;
  }

  async updateById(updateFields: ITemplateRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key: string) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
