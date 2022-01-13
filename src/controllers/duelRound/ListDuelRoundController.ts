import { Request, Response } from 'express';
import { DuelRoundRepository } from '../../repositories/implementations/DuelRoundRepository';
import { ListDuelRoundService } from '../../services/duelRound/ListDuelRoundService';

class ListDuelRoundController {
  async handle(req: Request, res: Response) {
    const listDuelRoundService = new ListDuelRoundService(
      new DuelRoundRepository()
    );

    const duelRounds = await listDuelRoundService.execute();

    return res.status(200).json(duelRounds);
  }
}

export default new ListDuelRoundController();
