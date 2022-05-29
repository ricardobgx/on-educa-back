import { Request, Response } from 'express';
import ILeagueSearchParams from '../../dto/league/ILeagueSearchParams';
import { LeagueRepository } from '../../repositories/implementations/league/LeagueRepository';
import { ListLeagueService } from '../../services/league/ListLeagueService';

class ListLeagueController {
  async handle(req: Request, res: Response) {
    const searchParams = req.query as ILeagueSearchParams;

    const listLeagueService = new ListLeagueService(new LeagueRepository());

    const leagues = await listLeagueService.execute(searchParams);

    return res.status(200).json(leagues);
  }
}

export default new ListLeagueController();
