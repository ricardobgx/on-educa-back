import { getCustomRepository, ObjectType } from 'typeorm';
import ILeagueSearchParams from '../../dto/league/ILeagueSearchParams';
import League from '../../entities/League';
import { ILeagueRepository } from '../../repositories/interfaces/league/ILeagueRepository';

export class ListLeagueService {
  leagueRepository: ILeagueRepository;

  constructor(leagueRepository: ILeagueRepository) {
    this.leagueRepository = leagueRepository;
  }

  async execute(searchParams: ILeagueSearchParams): Promise<League[]> {
    const leagueRepository = getCustomRepository(
      this.leagueRepository as unknown as ObjectType<ILeagueRepository>
    );

    const leagues = leagueRepository.findAll(searchParams);

    return leagues;
  }
}
