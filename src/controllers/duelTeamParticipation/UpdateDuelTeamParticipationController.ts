import { Request, Response } from 'express';
import { IDuelTeamParticipationRequest } from '../../dto/IDuelTeamParticipationRequest';
import { DuelTeamParticipationRepository } from '../../repositories/implementations/DuelTeamParticipationRepository';
import { UpdateDuelTeamParticipationService } from '../../services/duelTeamParticipation/UpdateDuelTeamParticipationService';

class UpdateDuelTeamParticipationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { index, studentId, duelTeamId } =
      req.body as IDuelTeamParticipationRequest;

    const updateDuelTeamParticipationService =
      new UpdateDuelTeamParticipationService(
        new DuelTeamParticipationRepository()
      );

    await updateDuelTeamParticipationService.execute({
      id,
      index,
      studentId,
      duelTeamId,
    });

    return res.status(200).json({ message: 'Entidade atualizada!' });
  }
}

export default new UpdateDuelTeamParticipationController();
