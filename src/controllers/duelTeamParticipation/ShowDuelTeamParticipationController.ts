import { Request, Response } from 'express';
import { DuelTeamParticipationRepository } from '../../repositories/implementations/DuelTeamParticipationRepository';
import { ShowDuelTeamParticipationService } from '../../services/duelTeamParticipation/ShowDuelTeamParticipationService';

class ShowDuelTeamParticipationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showDuelTeamParticipationService =
      new ShowDuelTeamParticipationService(
        new DuelTeamParticipationRepository()
      );

    const duelTeamParticipation =
      await showDuelTeamParticipationService.execute(id);

    return res.status(200).json(duelTeamParticipation);
  }
}

export default new ShowDuelTeamParticipationController();
