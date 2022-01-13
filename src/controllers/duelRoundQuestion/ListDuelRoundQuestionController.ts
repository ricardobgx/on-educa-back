import { Request, Response } from 'express';
import { DuelRoundQuestionRepository } from '../../repositories/implementations/DuelRoundQuestionRepository';
import { ListDuelRoundQuestionService } from '../../services/duelRoundQuestion/ListDuelRoundQuestionService';

class ListDuelRoundQuestionController {
  async handle(req: Request, res: Response) {
    const listDuelRoundQuestionService = new ListDuelRoundQuestionService(
      new DuelRoundQuestionRepository()
    );

    const duelRoundQuestions = await listDuelRoundQuestionService.execute();

    return res.status(200).json(duelRoundQuestions);
  }
}

export default new ListDuelRoundQuestionController();
