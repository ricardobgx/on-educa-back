import { Request, Response } from 'express';
import { IDuelRoundQuestionRequest } from '../../dto/IDuelRoundQuestionRequest';
import { DuelRoundQuestionRepository } from '../../repositories/implementations/DuelRoundQuestionRepository';
import { UpdateDuelRoundQuestionService } from '../../services/duelRoundQuestion/UpdateDuelRoundQuestionService';

class UpdateDuelRoundQuestionController {
  async handle(req: Request, res: Response) {
    const { questionId } = req.body as IDuelRoundQuestionRequest;

    const { id } = req.params;

    const updateDuelRoundQuestionService = new UpdateDuelRoundQuestionService(
      new DuelRoundQuestionRepository()
    );

    await updateDuelRoundQuestionService.execute({
      id,
      questionId,
    });

    return res.status(200).json({ message: 'Disciplina atualizada!' });
  }
}

export default new UpdateDuelRoundQuestionController();
