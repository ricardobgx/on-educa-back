import { getCustomRepository, ObjectType } from 'typeorm';
import ILeagueRequest from '../../dto/league/ILeagueRequest';
import { ILeagueRepository } from '../../repositories/interfaces/league/ILeagueRepository';

export class UpdateLeagueService {
  leagueRepository: ILeagueRepository;

  constructor(leagueRepository: ILeagueRepository) {
    this.leagueRepository = leagueRepository;
  }

  async execute(leagueParams: ILeagueRequest): Promise<void> {
    const leagueRepository = getCustomRepository(
      this.leagueRepository as unknown as ObjectType<ILeagueRepository>
    );

    await leagueRepository.updateById(leagueParams);
  }
}
