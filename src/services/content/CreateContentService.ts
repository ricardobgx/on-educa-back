import { getCustomRepository, ObjectType } from 'typeorm';
import { IContentRequest } from '../../dto/content/IContentRequest';
import { Content } from '../../entities/Content';
import { IContentRepository } from '../../repositories/interfaces/IContentRepository';

export class CreateContentService {
  contentRepository: IContentRepository;

  constructor(contentRepository: IContentRepository) {
    this.contentRepository = contentRepository;
  }

  async execute(contentParams: IContentRequest): Promise<Content> {
    const contentRepository = getCustomRepository(
      this.contentRepository as unknown as ObjectType<IContentRepository>
    );

    const content = contentRepository.createContent(contentParams);

    return content;
  }
}
