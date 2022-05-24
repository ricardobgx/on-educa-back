import { Request, Response } from 'express';
import { IDoubtSearchParams } from '../../dto/doubt/IDoubtSearchParams';
import { DoubtRepository } from '../../repositories/implementations/DoubtRepository';
import { ListDoubtService } from '../../services/doubt/ListDoubtService';

class ListDoubtController {
  async handle(req: Request, res: Response) {
    const searchParams = req.query as IDoubtSearchParams;

    console.log(searchParams);

    const listDoubtService = new ListDoubtService(new DoubtRepository());

    const doubts = await listDoubtService.execute(searchParams);

    return res.status(200).json(doubts);
  }
}

export default new ListDoubtController();
