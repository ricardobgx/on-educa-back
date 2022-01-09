import { Request, Response } from 'express';

import { IDuelTeamParticipationRequest } from '../../dto/IDuelTeamParticipationRequest';
import { DuelTeamParticipationRepository } from '../../repositories/implementations/DuelTeamParticipationRepository';
import { CreateDuelTeamParticipationService } from '../../services/duelTeamParticipation/CreateDuelTeamParticipationService';

class CreateDuelTeamParticipationController {
  async handle(req: Request, res: Response) {
    const { studentId, duelTeamId } = req.body as IDuelTeamParticipationRequest;

    const createDuelTeamParticipationService =
      new CreateDuelTeamParticipationService(
        new DuelTeamParticipationRepository()
      );

    const duelTeamParticipation =
      await createDuelTeamParticipationService.execute({
        studentId,
        duelTeamId,
      });

    return res.status(201).json(duelTeamParticipation);
  }
}

export default new CreateDuelTeamParticipationController();
