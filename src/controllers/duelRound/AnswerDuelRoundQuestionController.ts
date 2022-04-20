import { Request, Response } from 'express';
import { IAnswerDuelRoundQuestionRequest } from '../../dto/duelRoundQuestion/IAnswerDuelRoundQuestionRequest';
import { DuelRoundRepository } from '../../repositories/implementations/DuelRoundRepository';
import { AnswerDuelRoundQuestionService } from '../../services/duelRound/AnswerDuelRoundQuestionService';

class AnswerDuelRoundQuestionController {
  async handle(req: Request, res: Response) {
    const {
      duelRoundQuestionId,
      duelTeamParticipationId,
      selectedAlternativeId,
    } = req.body as IAnswerDuelRoundQuestionRequest;

    const { id: duelRoundId } = req.params;

    const updateDuelRoundService = new AnswerDuelRoundQuestionService(
      new DuelRoundRepository()
    );

    await updateDuelRoundService.execute({
      duelRoundId,
      duelRoundQuestionId,
      duelTeamParticipationId,
      selectedAlternativeId,
    });

    return res.status(200).json({ message: 'Entidade atualizada!' });
  }
}

export default new AnswerDuelRoundQuestionController();
