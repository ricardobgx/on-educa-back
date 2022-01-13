import { Request, Response } from 'express';
import { DuelRoundQuestionRepository } from '../../repositories/implementations/DuelRoundQuestionRepository';
import { ShowDuelRoundQuestionService } from '../../services/duelRoundQuestion/ShowDuelRoundQuestionService';

class ShowDuelRoundQuestionController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showDuelRoundQuestionService = new ShowDuelRoundQuestionService(
      new DuelRoundQuestionRepository()
    );

    const duelRoundQuestion = await showDuelRoundQuestionService.execute(id);

    return res.status(200).json(duelRoundQuestion);
  }
}

export default new ShowDuelRoundQuestionController();
