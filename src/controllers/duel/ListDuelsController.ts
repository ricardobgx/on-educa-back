import { Request, Response } from 'express';
import { DuelRepository } from '../../repositories/implementations/DuelRepository';
import { ListDuelService } from '../../services/duel/ListDuelService';

class ListDuelsController {
  async handle(req: Request, res: Response) {
    const listDuelService = new ListDuelService(new DuelRepository());

    const duels = await listDuelService.execute();

    return res.status(200).json(duels);
  }
}

export default new ListDuelsController();
