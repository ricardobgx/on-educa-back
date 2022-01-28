import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IImageRepository } from '../../repositories/interfaces/IImageRepository';

export class DeleteImageService {
  imageRepository: IImageRepository;

  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async execute(id: string): Promise<void> {
    const imageRepository = getCustomRepository(
      this.imageRepository as unknown as ObjectType<IImageRepository>
    );

    const image = await imageRepository.findById(id);

    if (!image) throw new ApplicationErrors('Entidade não existe!', 404);

    await imageRepository.deleteById(id);
  }
}
