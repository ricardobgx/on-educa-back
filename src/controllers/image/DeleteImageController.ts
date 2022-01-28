import { Request, Response } from 'express';
import { ImageRepository } from '../../repositories/implementations/ImageRepository';
import { DeleteImageService } from '../../services/image/DeleteImageService';

class DeleteImageController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteImageService = new DeleteImageService(new ImageRepository());

    await deleteImageService.execute(id);

    return res.status(200).json({ message: 'Imagem excluída!' });
  }
}

export default new DeleteImageController();
