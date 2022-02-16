import { getCustomRepository, ObjectType } from 'typeorm';
import { IContentRequest } from '../../dto/content/IContentRequest';
import { IContentRepository } from '../../repositories/interfaces/IContentRepository';

export class UpdateContentService {
  contentRepository: IContentRepository;

  constructor(contentRepository: IContentRepository) {
    this.contentRepository = contentRepository;
  }

  async execute(contentParams: IContentRequest): Promise<void> {
    const contentRepository = getCustomRepository(
      this.contentRepository as unknown as ObjectType<IContentRepository>
    );

    await contentRepository.updateById(contentParams);
  }
}
