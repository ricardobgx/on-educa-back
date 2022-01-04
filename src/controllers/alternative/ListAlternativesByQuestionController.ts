import { Request, Response } from 'express';
import { AlternativeRepository } from '../../repositories/implementations/AlternativeRepository';
import { ListAlternativesByQuestionService } from '../../services/alternative/ListAlternativesByQuestionService';

class ListAlternativesByQuestionController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listAlternativesByQuestionService =
      new ListAlternativesByQuestionService(new AlternativeRepository());

    const alternatives = await listAlternativesByQuestionService.execute(id);

    return res.status(200).json(alternatives);
  }
}

export default new ListAlternativesByQuestionController();
