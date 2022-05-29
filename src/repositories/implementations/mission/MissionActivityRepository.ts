import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { IMissionActivityRequest } from '../../../dto/missionActivity/IMissionActivityRequest';
import MissionActivity from '../../../entities/MissionActivity';
import { ApplicationErrors } from '../../../errors';
import { IMissionActivityRepository } from '../../interfaces/mission/IMissionActivityRepository';
import { MissionRepository } from './MissionRepository';

@EntityRepository(MissionActivity)
export class MissionActivityRepository
  extends Repository<MissionActivity>
  implements IMissionActivityRepository
{
  async createMissionActivity(
    missionActivityParams: IMissionActivityRequest
  ): Promise<MissionActivity> {
    const { activity, missionId } = missionActivityParams;

    if (!missionId)
      throw new ApplicationErrors('Id da missão não informado', 400);

    const missionRepository = await getCustomRepository(MissionRepository);

    const mission = await missionRepository.findById(missionId);

    if (!mission) throw new ApplicationErrors('Missão não encontrada', 404);

    const missionActivity = this.create({ activity, mission });

    return await this.save(missionActivity);
  }

  async findAll(): Promise<MissionActivity[]> {
    return await this.find({
      relations: ['mission'],
    });
  }

  async findById(id: string): Promise<MissionActivity> {
    return await this.findOne(
      { id },
      {
        relations: ['mission'],
      }
    );
  }

  async updateById(updateFields: IMissionActivityRequest): Promise<void> {
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
