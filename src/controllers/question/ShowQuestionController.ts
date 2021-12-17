import { Request, Response } from 'express';
import { QuestionRepository } from '../../repositories/implementations/QuestionRepository';
import { ShowQuestionService } from '../../services/question/ShowQuestionService';

class ShowQuestionController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showQuestionService = new ShowQuestionService(
      new QuestionRepository()
    );

    const question = await showQuestionService.execute(id);

    return res.status(200).json(question);
  }
}

export default new ShowQuestionController();
