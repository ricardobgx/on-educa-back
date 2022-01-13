import { Request, Response } from 'express';
import { IDuelRoundRequest } from '../../dto/IDuelRoundRequest';
import { DuelRoundRepository } from '../../repositories/implementations/DuelRoundRepository';
import { StartDuelRoundService } from '../../services/duelRound/StartDuelRoundService';

class StartDuelRoundController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const startDuelRoundService = new StartDuelRoundService(
      new DuelRoundRepository()
    );

    await startDuelRoundService.execute(id);

    return res.status(200).json({ message: 'Round iniciado!' });
  }
}

export default new StartDuelRoundController();
