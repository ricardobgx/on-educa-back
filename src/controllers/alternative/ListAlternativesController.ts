import { Request, Response } from 'express';
import { AlternativeRepository } from '../../repositories/implementations/AlternativeRepository';
import { ListAlternativesService } from '../../services/alternative/ListAlternativesService';

class ListAlternativesController {
  async handle(req: Request, res: Response) {
    const listAlternativeService = new ListAlternativesService(
      new AlternativeRepository()
    );

    const alternatives = await listAlternativeService.execute();

    return res.status(200).json(alternatives);
  }
}

export default new ListAlternativesController();
