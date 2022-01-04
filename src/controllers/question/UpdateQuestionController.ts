import { Request, Response } from 'express';
import { IQuestionRequest } from '../../dto/IQuestionRequest';
import { QuestionRepository } from '../../repositories/implementations/QuestionRepository';
import { UpdateQuestionService } from '../../services/question/UpdateQuestionService';

class UpdateQuestionController {
  async handle(req: Request, res: Response) {
    const { description, difficulty, contentId } = req.body as IQuestionRequest;

    const { id } = req.params;

    const updateQuestionService = new UpdateQuestionService(
      new QuestionRepository()
    );

    await updateQuestionService.execute({
      id,
      description,
      difficulty,
      contentId,
    });

    return res.status(200).json({ message: 'Disciplina atualizada!' });
  }
}

export default new UpdateQuestionController();