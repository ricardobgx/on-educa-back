import { getCustomRepository, ObjectType } from 'typeorm';
import { ITemplateRequest } from '../../dto/template/ITemplateRequest';
import { ITemplateRepository } from '../../repositories/interfaces/ITemplateRepository';

export class UpdateTemplateService {
  templateRepository: ITemplateRepository;

  constructor(templateRepository: ITemplateRepository) {
    this.templateRepository = templateRepository;
  }

  async execute(templateParams: ITemplateRequest): Promise<void> {
    const templateRepository = getCustomRepository(
      this.templateRepository as unknown as ObjectType<ITemplateRepository>
    );

    await templateRepository.updateById(templateParams);
  }
}
