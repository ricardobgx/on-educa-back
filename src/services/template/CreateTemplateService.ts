import { getCustomRepository, ObjectType } from 'typeorm';
import { ITemplateRequest } from '../../dto/template/ITemplateRequest';
import { Template } from '../../entities/Template';
import { ITemplateRepository } from '../../repositories/interfaces/ITemplateRepository';

export class CreateTemplateService {
  templateRepository: ITemplateRepository;

  constructor(templateRepository: ITemplateRepository) {
    this.templateRepository = templateRepository;
  }

  async execute(templateParams: ITemplateRequest): Promise<Template> {
    const templateRepository = getCustomRepository(
      this.templateRepository as unknown as ObjectType<ITemplateRepository>
    );

    const template = templateRepository.createTemplate(templateParams);

    return template;
  }
}
