import { Request, Response } from 'express';
import { IDuelTeamParticipationByDuelRequest } from '../../dto/IDuelTeamParticipationByDuelRequest';
import { DuelTeamParticipationRepository } from '../../repositories/implementations/DuelTeamParticipationRepository';
import { CreateDuelTeamParticipationByDuelService } from '../../services/duelTeamParticipation/CreateDuelTeamParticipationByDuelService';

class CreateDuelTeamParticipationByDuelController {
  async handle(req: Request, res: Response) {
    const { studentId, duelId } =
      req.body as IDuelTeamParticipationByDuelRequest;

    const createDuelTeamParticipationByDuelService =
      new CreateDuelTeamParticipationByDuelService(
        new DuelTeamParticipationRepository()
      );

    const duelTeamParticipation =
      await createDuelTeamParticipationByDuelService.execute({
        studentId,
        duelId,
      });

    return res.status(201).json(duelTeamParticipation);
  }
}

export default new CreateDuelTeamParticipationByDuelController();
