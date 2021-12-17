import { Request, Response } from 'express';
import { ContentRepository } from '../../repositories/implementations/ContentRepository';
import { DeleteContentService } from '../../services/content/DeleteContentService';

class DeleteContentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteContentService = new DeleteContentService(
      new ContentRepository()
    );

    await deleteContentService.execute(id);

    return res.status(200).json({ message: 'Conteúdo removido' });
  }
}

export default new DeleteContentController();
