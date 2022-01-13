import { Request, Response } from 'express';
import { DuelTeamParticipationRepository } from '../../repositories/implementations/DuelTeamParticipationRepository';
import { ExitDuelTeamParticipationService } from '../../services/duelTeamParticipation/ExitDuelTeamParticipationService';

class ExitDuelTeamParticipationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const exitDuelTeamParticipationService =
      new ExitDuelTeamParticipationService(
        new DuelTeamParticipationRepository()
      );

    const duelTeamParticipation =
      await exitDuelTeamParticipationService.execute(id);

    return res.status(200).json(duelTeamParticipation);
  }
}

export default new ExitDuelTeamParticipationController();
