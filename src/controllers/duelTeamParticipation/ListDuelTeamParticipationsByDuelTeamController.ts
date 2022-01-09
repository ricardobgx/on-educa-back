import { Request, Response } from 'express';
import { DuelTeamParticipationRepository } from '../../repositories/implementations/DuelTeamParticipationRepository';
import { ListDuelTeamParticipationByDuelTeamService } from '../../services/duelTeamParticipation/ListDuelTeamParticipationByDuelTeamService';

class ListDuelTeamParticipationsByDuelTeamController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listDuelTeamParticipationByDuelTeamService =
      new ListDuelTeamParticipationByDuelTeamService(
        new DuelTeamParticipationRepository()
      );

    const duelTeamParticipations =
      await listDuelTeamParticipationByDuelTeamService.execute(id);

    return res.status(200).json(duelTeamParticipations);
  }
}

export default new ListDuelTeamParticipationsByDuelTeamController();
