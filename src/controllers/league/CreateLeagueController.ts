import { Request, Response } from 'express';
import ILeagueRequest from '../../dto/league/ILeagueRequest';
import { LeagueRepository } from '../../repositories/implementations/league/LeagueRepository';
import { CreateLeagueService } from '../../services/league/CreateLeagueService';

class CreateLeagueController {
  async handle(req: Request, res: Response) {
    const leagueParams = req.body as ILeagueRequest;

    const createLeagueService = new CreateLeagueService(new LeagueRepository());

    const league = await createLeagueService.execute(leagueParams);

    return res.status(200).json(league);
  }
}

export default new CreateLeagueController();
