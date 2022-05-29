import { getCustomRepository, ObjectType } from 'typeorm';
import { ILeagueRepository } from '../../repositories/interfaces/league/ILeagueRepository';

export class DeleteLeagueService {
  leagueRepository: ILeagueRepository;

  constructor(leagueRepository: ILeagueRepository) {
    this.leagueRepository = leagueRepository;
  }

  async execute(id: string): Promise<void> {
    const leagueRepository = getCustomRepository(
      this.leagueRepository as unknown as ObjectType<ILeagueRepository>
    );

    await leagueRepository.deleteById(id);
  }
}
