import { Request, Response } from 'express';
import { IDuelQuestionAnswerRequest } from '../../dto/duelRoundQuestion/IDuelQuestionAnswerRequest';
import { DuelQuestionAnswerRepository } from '../../repositories/implementations/DuelQuestionAnswerRepository';
import { UpdateDuelQuestionAnswerService } from '../../services/duelQuestionAnswer/UpdateDuelQuestionAnswerService';

class UpdateDuelQuestionAnswerController {
  async handle(req: Request, res: Response) {
    const { questionId } = req.body as IDuelQuestionAnswerRequest;

    const { id } = req.params;

    const updateDuelQuestionAnswerService = new UpdateDuelQuestionAnswerService(
      new DuelQuestionAnswerRepository()
    );

    await updateDuelQuestionAnswerService.execute({
      id,
      questionId,
    });

    return res.status(200).json({ message: 'Disciplina atualizada!' });
  }
}

export default new UpdateDuelQuestionAnswerController();
