import { Request, Response } from 'express';
import { DoubtRepository } from '../../repositories/implementations/DoubtRepository';
import { ShowDoubtService } from '../../services/doubt/ShowDoubtService';

class ShowDoubtController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showDoubtService = new ShowDoubtService(new DoubtRepository());

    const doubt = await showDoubtService.execute(id);

    return res.status(200).json(doubt);
  }
}

export default new ShowDoubtController();
