import { getCustomRepository, ObjectType } from 'typeorm';
import { ITemplateRepository } from '../../repositories/interfaces/ITemplateRepository';

export class DeleteTemplateService {
  templateRepository: ITemplateRepository;

  constructor(templateRepository: ITemplateRepository) {
    this.templateRepository = templateRepository;
  }

  async execute(id: string): Promise<void> {
    const templateRepository = getCustomRepository(
      this.templateRepository as unknown as ObjectType<ITemplateRepository>
    );

    await templateRepository.deleteById(id);
  }
}
