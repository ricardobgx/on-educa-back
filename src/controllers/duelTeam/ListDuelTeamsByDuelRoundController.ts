import { Request, Response } from 'express';
import { DuelTeamRepository } from '../../repositories/implementations/DuelTeamRepository';
import { ListDuelTeamByDuelRoundService } from '../../services/duelTeam/ListDuelTeamByDuelRoundService';

class ListDuelTeamByDuelRoundController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listDuelTeamByDuelRoundService = new ListDuelTeamByDuelRoundService(
      new DuelTeamRepository()
    );

    const duelTeam = await listDuelTeamByDuelRoundService.execute(id);

    return res.status(200).json(duelTeam);
  }
}

export default new ListDuelTeamByDuelRoundController();
