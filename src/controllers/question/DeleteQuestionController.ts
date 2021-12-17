import { Request, Response } from 'express';
import { QuestionRepository } from '../../repositories/implementations/QuestionRepository';
import { DeleteQuestionService } from '../../services/question/DeleteQuestionService';

class DeleteQuestionController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteQuestionService = new DeleteQuestionService(
      new QuestionRepository()
    );

    await deleteQuestionService.execute(id);

    return res.status(200).json({ message: 'Disciplina removida!' });
  }
}

export default new DeleteQuestionController();
