import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { IMissionProgressRequest } from '../../../dto/missionProgress/IMissionProgressRequest';
import MissionProgress from '../../../entities/MissionProgress';
import { ApplicationErrors } from '../../../errors';
import { IMissionProgressRepository } from '../../interfaces/mission/IMissionProgressRepository';
import { PeopleRepository } from '../PeopleRepository';
import { MissionRepository } from './MissionRepository';
import { EMissionProgressStatus } from '../../../enums/EMissionProgressStatus';
import { IMissionProgressSearchParams } from '../../../dto/missionProgress/IMissionProgressSearchParams';

@EntityRepository(MissionProgress)
export class MissionProgressRepository
  extends Repository<MissionProgress>
  implements IMissionProgressRepository
{
  async createMissionProgress(
    missionProgressParams: IMissionProgressRequest
  ): Promise<MissionProgress> {
    const { peopleId, missionId } = missionProgressParams;

    if (!peopleId)
      throw new ApplicationErrors('Id da pessoa não informada', 400);

    if (!missionId)
      throw new ApplicationErrors('Id da missão não informado', 400);

    const peopleRepository = await getCustomRepository(PeopleRepository);
    const people = await peopleRepository.findById(peopleId);

    if (!people) throw new ApplicationErrors('Pessoa não encontrada', 404);

    const missionRepository = await getCustomRepository(MissionRepository);
    const mission = await missionRepository.findById(missionId);

    if (!mission) throw new ApplicationErrors('Missão não encontrada', 404);

    const missionProgress = this.create({
      progress: 0,
      status: EMissionProgressStatus.INCOMPLETED,
      people,
    });

    return await this.save(missionProgress);
  }

  async findAll(
    searchParams: IMissionProgressSearchParams
  ): Promise<MissionProgress[]> {
    const { peopleId, missionId } = searchParams;

    let where = {};

    if (peopleId) {
      const peopleRepository = await getCustomRepository(PeopleRepository);
      const people = await peopleRepository.findById(peopleId);

      if (people) {
        where['people'] = people;
      }
    }

    if (missionId) {
      const missionRepository = await getCustomRepository(MissionRepository);
      const mission = await missionRepository.findById(missionId);

      if (mission) {
        where['mission'] = mission;
      }
    }

    let progressFound = await this.find({
      relations: ['mission', 'people'],
      where,
    });

    if (where['people'] && where['mission'] && progressFound.length === 0) {
      const peopleProgress = await this.createMissionProgress({
        missionId,
        peopleId,
      });

      progressFound.push(peopleProgress);
    }

    return progressFound;
  }

  async findById(id: string): Promise<MissionProgress> {
    return await this.findOne(
      { id },
      {
        relations: ['mission', 'people'],
      }
    );
  }

  async updateById(updateFields: IMissionProgressRequest): Promise<void> {
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
