import { Request, Response } from 'express';
import { compressImage } from '../../config/upload';
import { IImageRequest } from '../../dto/image/IImageRequest';
import { ImageRepository } from '../../repositories/implementations/ImageRepository';
import { CreateImageService } from '../../services/image/CreateImageService';

class CreateImageController {
  async handle(req: Request, res: Response) {
    if (req.file) {
      const img = req.file;
      let path = img.filename;

      await compressImage(img, 512)
        .then(
          () => {
            path = img.filename.split('.')[0] + '.webp';
          },
          (err) => {
            console.log(err);
          }
        )
        .catch((err) => {
          console.log(err);
        });

      const createImageService = new CreateImageService(new ImageRepository());

      const image = await createImageService.execute({
        path,
      });

      return res.status(201).json(image);
    }
    return res
      .status(500)
      .json({ message: 'Ocorreu um erro durante o upload' });
  }
}

export default new CreateImageController();
