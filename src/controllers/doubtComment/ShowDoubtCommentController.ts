import { Request, Response } from 'express';
import { DoubtCommentRepository } from '../../repositories/implementations/DoubtCommentRepository';
import { ShowDoubtCommentService } from '../../services/doubtComment/ShowDoubtCommentService';

class ShowDoubtCommentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showDoubtCommentService = new ShowDoubtCommentService(
      new DoubtCommentRepository()
    );

    const doubtComment = await showDoubtCommentService.execute(id);

    return res.status(200).json(doubtComment);
  }
}

export default new ShowDoubtCommentController();
