import { Request, Response } from 'express';
import { IChangeDuelTeamPositionRequest } from '../../dto/duelTeamParticipation/IChangeDuelTeamPositionRequest';
import { DuelTeamParticipationRepository } from '../../repositories/implementations/DuelTeamParticipationRepository';
import { ChangeDuelTeamPositionService } from '../../services/duelTeamParticipation/ChangeDuelTeamPositionService';

class ChangeDuelTeamPositionController {
  async handle(req: Request, res: Response) {
    const {
      oldDuelTeamParticipationId,
      newDuelTeamParticipationId,
      studentId,
    } = req.body as IChangeDuelTeamPositionRequest;

    const changeDuelTeamPositionService = new ChangeDuelTeamPositionService(
      new DuelTeamParticipationRepository()
    );

    const duelTeamParticipation = await changeDuelTeamPositionService.execute({
      oldDuelTeamParticipationId,
      newDuelTeamParticipationId,
      studentId,
    });

    return res.status(201).json(duelTeamParticipation);
  }
}

export default new ChangeDuelTeamPositionController();
