import { getCustomRepository, ObjectType } from 'typeorm';
import { IImageRequest } from '../../dto/IImageRequest';
import { Image } from '../../entities/Image';
import { IImageRepository } from '../../repositories/interfaces/IImageRepository';

export class CreateImageService {
  imageRepository: IImageRepository;

  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async execute(imageParams: IImageRequest): Promise<Image> {
    const imageRepository = getCustomRepository(
      this.imageRepository as unknown as ObjectType<IImageRepository>
    );

    const image = await imageRepository.createImage(imageParams);

    return image;
  }
}
