import { getCustomRepository, ObjectType } from "typeorm";
import { Content } from "../../entities/Content";
import { IContentRepository } from "../../repositories/interfaces/IContentRepository";

export class ListContentService {
  contentRepository: IContentRepository;

  constructor(contentRepository: IContentRepository) {
    this.contentRepository = contentRepository;
  }

  async execute(): Promise<Content[]> {
    const contentRepository = getCustomRepository(this.contentRepository as unknown as ObjectType<IContentRepository>);

    const contents = contentRepository.findAll();

    return contents;
  }
}