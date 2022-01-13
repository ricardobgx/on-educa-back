import { Request, Response } from 'express';
import { DuelRoundQuestionRepository } from '../../repositories/implementations/DuelRoundQuestionRepository';
import { ListDuelRoundQuestionByContentService } from '../../services/duelRoundQuestion/ListDuelRoundQuestionByDuelRoundService';

class ListDuelRoundQuestionByContentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listDuelRoundQuestionByContentService =
      new ListDuelRoundQuestionByContentService(
        new DuelRoundQuestionRepository()
      );

    const duelRoundQuestions =
      await listDuelRoundQuestionByContentService.execute(id);

    return res.status(200).json(duelRoundQuestions);
  }
}

export default new ListDuelRoundQuestionByContentController();
