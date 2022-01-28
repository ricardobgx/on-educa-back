import { Request, Response } from 'express';
import { compressImage } from '../../config/upload';
import { IImageRequest } from '../../dto/IImageRequest';
import { ImageRepository } from '../../repositories/implementations/ImageRepository';
import { CreateImageService } from '../../services/image/CreateImageService';

class CreateImageController {
  async handle(req: Request, res: Response) {
    if (req.file) {
      const img = req.file;
      let path = img.filename;

      console.log(img.size);

      if (img.size > 500000) {
        await compressImage(img, 512)
          .then(() => {
            path = img.filename.split('.')[0] + '.png';
          })
          .catch((err) => {
            console.log('erro');
          });
      }

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
