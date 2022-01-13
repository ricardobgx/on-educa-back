import { Request, Response } from 'express';
import { DuelRoundQuestionRepository } from '../../repositories/implementations/DuelRoundQuestionRepository';
import { DeleteDuelRoundQuestionService } from '../../services/duelRoundQuestion/DeleteDuelRoundQuestionService';

class DeleteDuelRoundQuestionController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteDuelRoundQuestionService = new DeleteDuelRoundQuestionService(
      new DuelRoundQuestionRepository()
    );

    await deleteDuelRoundQuestionService.execute(id);

    return res.status(200).json({ message: 'Disciplina removida!' });
  }
}

export default new DeleteDuelRoundQuestionController();
