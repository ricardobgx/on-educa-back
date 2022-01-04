import { Request, Response } from 'express';
import { QuestionRepository } from '../../repositories/implementations/QuestionRepository';
import { ListQuestionByContentService } from '../../services/question/ListQuestionByContentService';

class ListQuestionByContentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listQuestionByContentService = new ListQuestionByContentService(
      new QuestionRepository()
    );

    const questions = await listQuestionByContentService.execute(id);

    return res.status(200).json(questions);
  }
}

export default new ListQuestionByContentController();
