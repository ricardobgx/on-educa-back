import { Request, Response } from 'express';

import { IDuelQuestionAnswerRequest } from '../../dto/duelRoundQuestion/IDuelQuestionAnswerRequest';
import { DuelQuestionAnswerRepository } from '../../repositories/implementations/DuelQuestionAnswerRepository';
import { CreateDuelQuestionAnswerService } from '../../services/duelQuestionAnswer/CreateDuelQuestionAnswerService';

class CreateDuelQuestionAnswerController {
  async handle(req: Request, res: Response) {
    const { duelTeamParticipationId, questionId, selectedAlternativeId } =
      req.body as IDuelQuestionAnswerRequest;

    const createDuelQuestionAnswerService = new CreateDuelQuestionAnswerService(
      new DuelQuestionAnswerRepository()
    );

    const duelQuestionAnswer = await createDuelQuestionAnswerService.execute({
      duelTeamParticipationId,
      questionId,
      selectedAlternativeId,
    });

    return res.status(201).json(duelQuestionAnswer);
  }
}

export default new CreateDuelQuestionAnswerController();
