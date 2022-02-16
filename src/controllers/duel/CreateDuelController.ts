import { Request, Response } from 'express';

import { IDuelRequest } from '../../dto/duel/IDuelRequest';
import { DuelRepository } from '../../repositories/implementations/DuelRepository';
import { CreateDuelService } from '../../services/duel/CreateDuelService';

class CreateDuelController {
  async handle(req: Request, res: Response) {
    const {
      maxGroupParticipants,
      questionsPerContent,
      timeForQuestion,
      studentId,
      contentsId,
    } = req.body as IDuelRequest;

    const createDuelService = new CreateDuelService(new DuelRepository());

    const Duel = await createDuelService.execute({
      maxGroupParticipants,
      questionsPerContent,
      timeForQuestion,
      studentId,
      contentsId,
    });

    return res.status(201).json(Duel);
  }
}

export default new CreateDuelController();
