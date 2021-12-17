import { Request, Response } from 'express';
import { QuestionRepository } from '../../repositories/implementations/QuestionRepository';
import { ListQuestionService } from '../../services/question/ListQuestionService';

class ListQuestionController {
  async handle(req: Request, res: Response) {
    const listQuestionService = new ListQuestionService(
      new QuestionRepository()
    );

    const questions = await listQuestionService.execute();

    return res.status(200).json(questions);
  }
}

export default new ListQuestionController();
