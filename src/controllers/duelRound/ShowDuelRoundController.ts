import { Request, Response } from 'express';
import { DuelRoundRepository } from '../../repositories/implementations/DuelRoundRepository';
import { ShowDuelRoundService } from '../../services/duelRound/ShowDuelRoundService';

class ShowDuelRoundController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showDuelRoundService = new ShowDuelRoundService(
      new DuelRoundRepository()
    );

    const duelRound = await showDuelRoundService.execute(id);

    return res.status(200).json(duelRound);
  }
}

export default new ShowDuelRoundController();
