import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { deleteImage } from '../../config/upload';
import { IImageRequest } from '../../dto/image/IImageRequest';
import { Image } from '../../entities/Image';
import { IImageRepository } from '../interfaces/IImageRepository';
import path from 'path';
import { ApplicationErrors } from '../../errors';

@EntityRepository(Image)
export class ImageRepository
  extends Repository<Image>
  implements IImageRepository
{
  async createImage(imageParams: IImageRequest): Promise<Image> {
    const { path } = imageParams;

    // Salva a imagem na base de dados e retorna
    return await this.save({ path });
  }

  async findAll(): Promise<Image[]> {
    return await this.find({
      relations: [],
    });
  }

  async findById(id: string): Promise<Image | undefined> {
    const image = await this.findOne({ id });
    const imagePath = `${process.env.HOST}/uploads/${image.path}`;

    return { ...image, path: imagePath };
  }

  async deleteById(id: string): Promise<DeleteResult> {
    const image = await this.findOne({ id });
    
    if (!image) {
      throw new ApplicationErrors('Imagem não encontrada', 404);
    }
    
    await deleteImage(image.path);

    return await this.delete({ id });
  }
}
