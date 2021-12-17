import { getCustomRepository, ObjectType } from 'typeorm';
import { IContentRepository } from '../../repositories/interfaces/IContentRepository';

export class DeleteContentService {
  contentRepository: IContentRepository;

  constructor(contentRepository: IContentRepository) {
    this.contentRepository = contentRepository;
  }

  async execute(id: string): Promise<void> {
    const contentRepository = getCustomRepository(
      this.contentRepository as unknown as ObjectType<IContentRepository>
    );

    await contentRepository.deleteById(id);
  }
}
