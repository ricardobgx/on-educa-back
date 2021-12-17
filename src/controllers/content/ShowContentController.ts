import { Request, Response } from 'express';
import { ContentRepository } from '../../repositories/implementations/ContentRepository';
import { ShowContentService } from '../../services/content/ShowContentService';

class ShowContentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showContentService = new ShowContentService(new ContentRepository());

    const content = await showContentService.execute(id);

    return res.status(200).json(content);
  }
}

export default new ShowContentController();
