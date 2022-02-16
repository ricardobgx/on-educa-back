import { Request, Response } from 'express';
import { IQuestionRequest } from '../../dto/question/IQuestionRequest';
import { QuestionRepository } from '../../repositories/implementations/QuestionRepository';
import { UpdateQuestionService } from '../../services/question/UpdateQuestionService';

class UpdateQuestionController {
  async handle(req: Request, res: Response) {
    const { description, difficulty, contentId, rightAlternativeId } =
      req.body as IQuestionRequest;

    const { id } = req.params;

    const updateQuestionService = new UpdateQuestionService(
      new QuestionRepository()
    );

    await updateQuestionService.execute({
      id,
      description,
      difficulty,
      contentId,
      rightAlternativeId,
    });

    return res.status(200).json({ message: 'Disciplina atualizada!' });
  }
}

export default new UpdateQuestionController();
