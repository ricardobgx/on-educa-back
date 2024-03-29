import { Request, Response } from 'express';
import { IDuelTeamRequest } from '../../dto/duelTeam/IDuelTeamRequest';
import { DuelTeamRepository } from '../../repositories/implementations/DuelTeamRepository';
import { UpdateDuelTeamService } from '../../services/duelTeam/UpdateDuelTeamService';

class UpdateDuelTeamController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { index, name } = req.body as IDuelTeamRequest;

    const updateDuelTeamService = new UpdateDuelTeamService(
      new DuelTeamRepository()
    );

    await updateDuelTeamService.execute({
      id,
      index,
      name,
    });

    return res.status(200).json({ message: 'Entidade atualizada!' });
  }
}

export default new UpdateDuelTeamController();
