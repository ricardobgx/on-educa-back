import { Request, Response } from 'express';
import { DuelRepository } from '../../repositories/implementations/DuelRepository';
import { DeleteDuelService } from '../../services/duel/DeleteDuelService';

class DeleteDuelControllerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteDuelService = new DeleteDuelService(new DuelRepository());

    await deleteDuelService.execute(id);

    return res.status(200).json({ message: 'Duelo removido!' });
  }
}

export default new DeleteDuelControllerController();
