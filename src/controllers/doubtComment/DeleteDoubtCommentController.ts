import { Request, Response } from 'express';
import { DoubtCommentRepository } from '../../repositories/implementations/DoubtCommentRepository';
import { DeleteDoubtCommentService } from '../../services/doubtComment/DeleteDoubtCommentService';

class DeleteDoubtCommentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteDoubtCommentService = new DeleteDoubtCommentService(
      new DoubtCommentRepository()
    );

    await deleteDoubtCommentService.execute(id);

    return res.status(200).json({ message: 'Disciplina removida!' });
  }
}

export default new DeleteDoubtCommentController();
