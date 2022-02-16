import { DeleteResult } from 'typeorm';
import { IImageRequest } from '../../dto/image/IImageRequest';
import { Image } from '../../entities/Image';

export interface IImageRepository {
  createImage(ImageParams: IImageRequest): Promise<Image>;
  findAll(): Promise<Image[]>;
  findById(id: string): Promise<Image | undefined>;
  deleteById(id: string): Promise<DeleteResult>;
}
