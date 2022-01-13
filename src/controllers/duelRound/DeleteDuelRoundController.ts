import { Request, Response } from 'express';
import { DuelRoundRepository } from '../../repositories/implementations/DuelRoundRepository';
import { DeleteDuelRoundService } from '../../services/duelRound/DeleteDuelRoundService';

class DeleteDuelRoundController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteDuelRoundService = new DeleteDuelRoundService(
      new DuelRoundRepository()
    );

    await deleteDuelRoundService.execute(id);

    return res.status(200).json({ message: 'Entidade removida!' });
  }
}

export default new DeleteDuelRoundController();
