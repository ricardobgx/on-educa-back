import { Request, Response } from 'express';
import ILeagueRequest from '../../dto/league/ILeagueRequest';
import { LeagueRepository } from '../../repositories/implementations/league/LeagueRepository';
import { UpdateLeagueService } from '../../services/league/UpdateLeagueService';

class UpdateLeagueController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const updateParams = req.body as ILeagueRequest;

    const updateLeagueService = new UpdateLeagueService(new LeagueRepository());

    await updateLeagueService.execute({ id, ...updateParams });

    return res.status(200).json({ message: 'Liga atualizada' });
  }
}

export default new UpdateLeagueController();
