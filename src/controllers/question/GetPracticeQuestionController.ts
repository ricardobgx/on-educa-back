import { Request, Response } from 'express';
import { QuestionRepository } from '../../repositories/implementations/QuestionRepository';
import { GetPracticeQuestionService } from '../../services/question/GetPracticeQuestionService';

class GetPracticeQuestionController {
  async handle(req: Request, res: Response) {
    const { contentId } = req.params;

    const getPracticeQuestionService = new GetPracticeQuestionService(
      new QuestionRepository()
    );

    const questions = await getPracticeQuestionService.execute(contentId);

    return res.status(200).json(questions);
  }
}

export default new GetPracticeQuestionController();
