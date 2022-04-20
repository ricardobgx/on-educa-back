import { Request, Response } from 'express';

import { IDuelRoundQuestionRequest } from '../../dto/duelRoundQuestion/IDuelRoundQuestionRequest';
import { DuelRoundQuestionRepository } from '../../repositories/implementations/DuelRoundQuestionRepository';
import { CreateDuelRoundQuestionService } from '../../services/duelRoundQuestion/CreateDuelRoundQuestionService';

class CreateDuelRoundQuestionController {
  async handle(req: Request, res: Response) {
    const { questionId } = req.body as IDuelRoundQuestionRequest;

    const createDuelRoundQuestionService = new CreateDuelRoundQuestionService(
      new DuelRoundQuestionRepository()
    );

    const duelRoundQuestion = await createDuelRoundQuestionService.execute({
      questionId,
    });

    return res.status(201).json(duelRoundQuestion);
  }
}

export default new CreateDuelRoundQuestionController();
