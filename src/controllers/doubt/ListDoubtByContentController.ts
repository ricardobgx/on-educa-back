import { Request, Response } from 'express';
import { DoubtRepository } from '../../repositories/implementations/DoubtRepository';
import { ListDoubtByContentService } from '../../services/doubt/ListDoubtByContentService';

class ListDoubtByContentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listDoubtByContentService = new ListDoubtByContentService(
      new DoubtRepository()
    );

    const doubts = await listDoubtByContentService.execute(id);

    return res.status(200).json(doubts);
  }
}

export default new ListDoubtByContentController();
