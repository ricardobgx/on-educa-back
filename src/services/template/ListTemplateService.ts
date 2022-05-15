import { getCustomRepository, ObjectType } from "typeorm";
import { Template } from "../../entities/Template";
import { ITemplateRepository } from "../../repositories/interfaces/ITemplateRepository";

export class ListTemplateService {
  templateRepository: ITemplateRepository;

  constructor(templateRepository: ITemplateRepository) {
    this.templateRepository = templateRepository;
  }

  async execute(): Promise<Template[]> {
    const templateRepository = getCustomRepository(this.templateRepository as unknown as ObjectType<ITemplateRepository>);

    const units = templateRepository.findAll();

    return units;
  }
}