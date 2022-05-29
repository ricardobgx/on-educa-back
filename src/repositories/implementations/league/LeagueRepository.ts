import { EntityRepository, Repository } from 'typeorm';
import ILeagueRequest from '../../../dto/league/ILeagueRequest';
import ILeagueSearchParams from '../../../dto/league/ILeagueSearchParams';
import League from '../../../entities/League';
import { ILeagueRepository } from '../../interfaces/league/ILeagueRepository';

@EntityRepository(League)
export class LeagueRepository
  extends Repository<League>
  implements ILeagueRepository
{
  async createLeague(leagueParams: ILeagueRequest): Promise<League> {
    const { type, level, minScore, requiredScore } = leagueParams;

    const league = this.create({ type, level, minScore, requiredScore });

    return await this.save(league);
  }

  async findAll(searchParams: ILeagueSearchParams): Promise<League[]> {
    let where = { ...searchParams };

    Object.keys(where).map((key) => {
      where[key] === undefined && delete where[key];
    });

    return await this.find({
      where,
      relations: ['peoples'],
    });
  }

  async findById(id: string): Promise<League> {
    return await this.findOne(
      { id },
      {
        relations: ['peoples'],
      }
    );
  }

  async updateById(updateFields: ILeagueRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<void> {
    await this.delete({ id });
  }
}
