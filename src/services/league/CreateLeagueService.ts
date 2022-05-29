import { getCustomRepository, ObjectType } from 'typeorm';
import ILeagueRequest from '../../dto/league/ILeagueRequest';
import League from '../../entities/League';
import { ILeagueRepository } from '../../repositories/interfaces/league/ILeagueRepository';

export class CreateLeagueService {
  leagueRepository: ILeagueRepository;

  constructor(leagueRepository: ILeagueRepository) {
    this.leagueRepository = leagueRepository;
  }

  async execute(leagueParams: ILeagueRequest): Promise<League> {
    const leagueRepository = getCustomRepository(
      this.leagueRepository as unknown as ObjectType<ILeagueRepository>
    );

    const league = leagueRepository.createLeague(leagueParams);

    return league;
  }
}
