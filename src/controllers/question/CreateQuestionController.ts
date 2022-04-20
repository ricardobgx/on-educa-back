import { Request, Response } from 'express';

import { IQuestionRequest } from '../../dto/question/IQuestionRequest';
import { QuestionRepository } from '../../repositories/implementations/QuestionRepository';
import { CreateQuestionService } from '../../services/question/CreateQuestionService';

class CreateQuestionController {
  async handle(req: Request, res: Response) {
    const { description, difficulty, contentId } = req.body as IQuestionRequest;

    const createQuestionService = new CreateQuestionService(
      new QuestionRepository()
    );

    const question = await createQuestionService.execute({
      description,
      difficulty,
      contentId,
    });

    return res.status(201).json(question);
  }
}

export default new CreateQuestionController();
