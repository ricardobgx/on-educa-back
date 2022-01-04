import { Request, Response } from 'express';
import { AlternativeRepository } from '../../repositories/implementations/AlternativeRepository';
import { DeleteAlternativeService } from '../../services/alternative/DeleteAlternativeService';

class DeleteAlternativeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteAlternativeService = new DeleteAlternativeService(
      new AlternativeRepository()
    );

    await deleteAlternativeService.execute(id);

    return res.status(200).json({ message: 'Alternativa removida!' });
  }
}

export default new DeleteAlternativeController();
