import { Request, Response } from 'express';
import { DuelQuestionAnswerRepository } from '../../repositories/implementations/DuelQuestionAnswerRepository';
import { ListDuelQuestionAnswerService } from '../../services/duelQuestionAnswer/ListDuelQuestionAnswerService';

class ListDuelQuestionAnswerController {
  async handle(req: Request, res: Response) {
    const listDuelQuestionAnswerService = new ListDuelQuestionAnswerService(
      new DuelQuestionAnswerRepository()
    );

    const duelQuestionAnswers = await listDuelQuestionAnswerService.execute();

    return res.status(200).json(duelQuestionAnswers);
  }
}

export default new ListDuelQuestionAnswerController();
