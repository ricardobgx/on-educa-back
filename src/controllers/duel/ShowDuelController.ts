import { Request, Response } from 'express';
import { DuelRepository } from '../../repositories/implementations/DuelRepository';
import { ShowDuelService } from '../../services/duel/ShowDuelService';

class ShowDuelController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showDuelService = new ShowDuelService(new DuelRepository());

    const duel = await showDuelService.execute(id);

    return res.status(200).json(duel);
  }
}

export default new ShowDuelController();
