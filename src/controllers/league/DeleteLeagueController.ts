import { Request, Response } from 'express';
import { LeagueRepository } from '../../repositories/implementations/league/LeagueRepository';
import { DeleteLeagueService } from '../../services/league/DeleteLeagueService';

class DeleteLeagueController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteLeagueService = new DeleteLeagueService(new LeagueRepository());

    await deleteLeagueService.execute(id);

    return res.status(200).json({ message: 'Liga removida' });
  }
}

export default new DeleteLeagueController();
