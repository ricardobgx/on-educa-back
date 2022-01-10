import { Request, Response } from 'express';

import { IParticipateInDuelRequest } from '../../dto/IParticipateInDuelRequest';
import { DuelTeamParticipationRepository } from '../../repositories/implementations/DuelTeamParticipationRepository';
import { ParticipateInDuelService } from '../../services/duelTeamParticipation/ParticipateInDuelService';

class ParticipateInDuelController {
  async handle(req: Request, res: Response) {
    const { duelId, studentId } = req.body as IParticipateInDuelRequest;

    const participateInDuelService = new ParticipateInDuelService(
      new DuelTeamParticipationRepository()
    );

    const duelTeamParticipation = await participateInDuelService.execute({
      studentId,
      duelId,
    });

    return res.status(201).json(duelTeamParticipation);
  }
}

export default new ParticipateInDuelController();
