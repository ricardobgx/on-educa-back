import { Request, Response } from 'express';
import { DoubtRepository } from '../../repositories/implementations/DoubtRepository';
import { ListDoubtService } from '../../services/doubt/ListDoubtService';

class ListDoubtController {
  async handle(req: Request, res: Response) {
    const listDoubtService = new ListDoubtService(new DoubtRepository());

    const doubts = await listDoubtService.execute();

    return res.status(200).json(doubts);
  }
}

export default new ListDoubtController();
