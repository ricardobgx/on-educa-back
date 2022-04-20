import { Request, Response } from 'express';

import { IDoubtCommentRequest } from '../../dto/doubtComment/IDoubtCommentRequest';
import { DoubtCommentRepository } from '../../repositories/implementations/DoubtCommentRepository';
import { CreateDoubtCommentService } from '../../services/doubtComment/CreateDoubtCommentService';

class CreateDoubtCommentController {
  async handle(req: Request, res: Response) {
    const { content, peopleId, doubtId } = req.body as IDoubtCommentRequest;

    const createDoubtCommentService = new CreateDoubtCommentService(
      new DoubtCommentRepository()
    );

    const DoubtComment = await createDoubtCommentService.execute({
      content,
      peopleId,
      doubtId,
    });

    return res.status(201).json(DoubtComment);
  }
}

export default new CreateDoubtCommentController();
