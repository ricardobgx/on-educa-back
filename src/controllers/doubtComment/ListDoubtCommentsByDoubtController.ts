import { Request, Response } from 'express';
import { DoubtCommentRepository } from '../../repositories/implementations/DoubtCommentRepository';
import { ListDoubtCommentsByDoubtService } from '../../services/doubtComment/ListDoubtCommentsByDoubtService';

class ListDoubtCommentsByDoubtController {
  async handle(req: Request, res: Response) {
    const { doubtId } = req.params;

    const listDoubtCommentByDoubtService = new ListDoubtCommentsByDoubtService(
      new DoubtCommentRepository()
    );

    const doubtComments = await listDoubtCommentByDoubtService.execute(doubtId);

    return res.status(200).json(doubtComments);
  }
}

export default new ListDoubtCommentsByDoubtController();
