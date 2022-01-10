import { Request, Response } from 'express';
import { DuelTeamRepository } from '../../repositories/implementations/DuelTeamRepository';
import { ListDuelTeamService } from '../../services/duelTeam/ListDuelTeamService';

class ListDuelTeamController {
  async handle(req: Request, res: Response) {
    const listDuelTeamService = new ListDuelTeamService(
      new DuelTeamRepository()
    );

    const duelTeam = await listDuelTeamService.execute();

    return res.status(200).json(duelTeam);
  }
}

export default new ListDuelTeamController();
