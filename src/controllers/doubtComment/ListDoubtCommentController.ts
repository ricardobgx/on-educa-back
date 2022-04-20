import { Request, Response } from 'express';
import { DoubtCommentRepository } from '../../repositories/implementations/DoubtCommentRepository';
import { ListDoubtCommentService } from '../../services/doubtComment/ListDoubtCommentService';

class ListDoubtCommentController {
  async handle(req: Request, res: Response) {
    const listDoubtCommentService = new ListDoubtCommentService(
      new DoubtCommentRepository()
    );

    const doubtComments = await listDoubtCommentService.execute();

    return res.status(200).json(doubtComments);
  }
}

export default new ListDoubtCommentController();
