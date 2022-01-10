import { Request, Response } from 'express';
import { DuelTeamRepository } from '../../repositories/implementations/DuelTeamRepository';
import { ShowDuelTeamService } from '../../services/duelTeam/ShowDuelTeamService';

class ShowDuelTeamController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showDuelTeamService = new ShowDuelTeamService(
      new DuelTeamRepository()
    );

    const duelTeam = await showDuelTeamService.execute(id);

    return res.status(200).json(duelTeam);
  }
}

export default new ShowDuelTeamController();
