import { Request, Response } from 'express';
import { DuelQuestionAnswerRepository } from '../../repositories/implementations/DuelQuestionAnswerRepository';
import { ShowDuelQuestionAnswerService } from '../../services/duelQuestionAnswer/ShowDuelQuestionAnswerService';

class ShowDuelQuestionAnswerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showDuelQuestionAnswerService = new ShowDuelQuestionAnswerService(
      new DuelQuestionAnswerRepository()
    );

    const duelQuestionAnswer = await showDuelQuestionAnswerService.execute(id);

    return res.status(200).json(duelQuestionAnswer);
  }
}

export default new ShowDuelQuestionAnswerController();
