import { Request, Response } from 'express';
import { DuelTeamRepository } from '../../repositories/implementations/DuelTeamRepository';
import { DeleteDuelTeamService } from '../../services/duelTeam/DeleteDuelTeamService';

class DeleteDuelTeamController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteDuelTeamService = new DeleteDuelTeamService(
      new DuelTeamRepository()
    );

    await deleteDuelTeamService.execute(id);

    return res.status(200).json({ message: 'Entidade removida!' });
  }
}

export default new DeleteDuelTeamController();
