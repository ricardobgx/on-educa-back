import { Request, Response } from 'express';
import { DoubtRepository } from '../../repositories/implementations/DoubtRepository';
import { DeleteDoubtService } from '../../services/doubt/DeleteDoubtService';

class DeleteDoubtController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteDoubtService = new DeleteDoubtService(new DoubtRepository());

    await deleteDoubtService.execute(id);

    return res.status(200).json({ message: 'Disciplina removida!' });
  }
}

export default new DeleteDoubtController();
