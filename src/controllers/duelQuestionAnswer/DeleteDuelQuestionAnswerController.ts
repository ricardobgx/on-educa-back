import { Request, Response } from 'express';
import { DuelQuestionAnswerRepository } from '../../repositories/implementations/DuelQuestionAnswerRepository';
import { DeleteDuelQuestionAnswerService } from '../../services/duelQuestionAnswer/DeleteDuelQuestionAnswerService';

class DeleteDuelQuestionAnswerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteDuelQuestionAnswerService = new DeleteDuelQuestionAnswerService(
      new DuelQuestionAnswerRepository()
    );

    await deleteDuelQuestionAnswerService.execute(id);

    return res.status(200).json({ message: 'Disciplina removida!' });
  }
}

export default new DeleteDuelQuestionAnswerController();
