import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { IMissionRequest } from '../../../dto/mission/IMissionRequest';
import Mission from '../../../entities/Mission';
import { IMissionRepository } from '../../interfaces/mission/IMissionRepository';
import { MissionActivityRepository } from './MissionActivityRepository';

@EntityRepository(Mission)
export class MissionRepository
  extends Repository<Mission>
  implements IMissionRepository
{
  async createMission(missionParams: IMissionRequest): Promise<Mission> {
    const { description, activities, isStudentMission, goal, reward } =
      missionParams;

    const newMissionParams = this.create({
      description,
      isStudentMission,
      goal,
      reward,
    });

    const mission = await this.save(newMissionParams);

    const missionActivityRepository = await getCustomRepository(
      MissionActivityRepository
    );

    await Promise.all(
      activities.map(
        async (activity) =>
          await missionActivityRepository.createMissionActivity({
            activity: activity.activity,
            missionId: mission.id,
          })
      )
    );

    return mission;
  }

  async findAll(): Promise<Mission[]> {
    return await this.find({
      relations: ['activities'],
    });
  }

  async findById(id: string): Promise<Mission> {
    return await this.findOne(
      { id },
      {
        relations: ['activities'],
      }
    );
  }

  async updateById(updateFields: IMissionRequest): Promise<void> {
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
