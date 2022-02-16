import { Request, Response } from 'express';

import { IDuelRoundRequest } from '../../dto/duelRound/IDuelRoundRequest';
import { DuelRoundRepository } from '../../repositories/implementations/DuelRoundRepository';
import { CreateDuelRoundService } from '../../services/duelRound/CreateDuelRoundService';

class CreateDuelRoundController {
  async handle(req: Request, res: Response) {
    const {
      status,
      maxGroupParticipants,
      questionsPerContent,
      timeForQuestion,
      duelId,
      contentsId,
    } = req.body as IDuelRoundRequest;

    const createDuelRoundService = new CreateDuelRoundService(
      new DuelRoundRepository()
    );

    const duelRound = await createDuelRoundService.execute({
      status,
      maxGroupParticipants,
      questionsPerContent,
      timeForQuestion,
      duelId,
      contentsId,
    });

    return res.status(201).json(duelRound);
  }
}

export default new CreateDuelRoundController();
