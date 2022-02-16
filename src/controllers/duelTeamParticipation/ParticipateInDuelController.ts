import { Request, Response } from 'express';

import { IParticipateInDuelRequest } from '../../dto/duel/IParticipateInDuelRequest';
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

    if (duelTeamParticipation) {
      return res.status(200).json(duelTeamParticipation);
    }

    return res.status(400).json({ message: 'Não foi possível participar' });
  }
}

export default new ParticipateInDuelController();
