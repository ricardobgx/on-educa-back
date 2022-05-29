import ILeagueRequest from '../../../dto/league/ILeagueRequest';
import League from '../../../entities/League';
import ILeagueSearchParams from '../../../dto/league/ILeagueSearchParams';

export interface ILeagueRepository {
  createLeague(leagueParams: ILeagueRequest): Promise<League>;
  findAll(searchParams: ILeagueSearchParams): Promise<League[]>;
  findById(id: string): Promise<League | undefined>;
  updateById(updateFields: ILeagueRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
