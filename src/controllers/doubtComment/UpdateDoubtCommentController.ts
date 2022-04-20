import { Request, Response } from 'express';
import { IDoubtCommentRequest } from '../../dto/doubtComment/IDoubtCommentRequest';
import { DoubtCommentRepository } from '../../repositories/implementations/DoubtCommentRepository';
import { UpdateDoubtCommentService } from '../../services/doubtComment/UpdateDoubtCommentService';

class UpdateDoubtCommentController {
  async handle(req: Request, res: Response) {
    const { content } = req.body as IDoubtCommentRequest;

    const { id } = req.params;

    const updateDoubtCommentService = new UpdateDoubtCommentService(
      new DoubtCommentRepository()
    );

    await updateDoubtCommentService.execute({ id, content });

    return res.status(200).json({ message: 'Disciplina atualizada!' });
  }
}

export default new UpdateDoubtCommentController();
