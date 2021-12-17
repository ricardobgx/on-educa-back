import { getCustomRepository, ObjectType } from 'typeorm';
import { Content } from '../../entities/Content';
import { IContentRepository } from '../../repositories/interfaces/IContentRepository';

export class ShowContentService {
  contentRepository: IContentRepository;

  constructor(contentRepository: IContentRepository) {
    this.contentRepository = contentRepository;
  }

  async execute(id: string): Promise<Content> {
    const contentRepository = getCustomRepository(
      this.contentRepository as unknown as ObjectType<IContentRepository>
    );

    const content = await contentRepository.findById(id);

    return content;
  }
}
