import { Request, Response } from 'express';
import { DuelTeamParticipationRepository } from '../../repositories/implementations/DuelTeamParticipationRepository';
import { ListDuelTeamParticipationService } from '../../services/duelTeamParticipation/ListDuelTeamParticipationService';

class ListDuelTeamParticipationsController {
  async handle(req: Request, res: Response) {
    const listDuelTeamParticipationService =
      new ListDuelTeamParticipationService(
        new DuelTeamParticipationRepository()
      );

    const duelTeamParticipations =
      await listDuelTeamParticipationService.execute();

    return res.status(200).json(duelTeamParticipations);
  }
}

export default new ListDuelTeamParticipationsController();
