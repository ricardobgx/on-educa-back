import { Request, Response } from 'express';
import { IContentRequest } from '../../dto/content/IContentRequest';
import { ContentRepository } from '../../repositories/implementations/ContentRepository';
import { UpdateContentService } from '../../services/content/UpdateContentService';

class UpdateContentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, video, index, unityId } =
      req.body as IContentRequest;

    const updateContentService = new UpdateContentService(
      new ContentRepository()
    );

    await updateContentService.execute({
      id,
      name,
      description,
      video,
      index,
      unityId,
    });

    return res.status(200).json({ message: 'Conteúdo atualizado' });
  }
}

export default new UpdateContentController();
