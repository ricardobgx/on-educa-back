import { Request, Response } from 'express';
import { AlternativeRepository } from '../../repositories/implementations/AlternativeRepository';
import { ShowAlternativeService } from '../../services/alternative/ShowAlternativeService';

class ShowAlternativeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showAlternativeService = new ShowAlternativeService(
      new AlternativeRepository()
    );

    const alternative = await showAlternativeService.execute(id);

    return res.status(200).json(alternative);
  }
}

export default new ShowAlternativeController();
