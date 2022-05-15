import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { IAchievementActivityRequest } from '../../dto/achievementActivity/IAchievementActivityRequest';
import AchievementActivity from '../../entities/AchievementActivity';
import { ApplicationErrors } from '../../errors';
import { IAchievementActivityRepository } from '../interfaces/IAchievementActivityRepository';
import { AchievementRepository } from './AchievementRepository';

@EntityRepository(AchievementActivity)
export class AchievementActivityRepository
  extends Repository<AchievementActivity>
  implements IAchievementActivityRepository
{
  async createAchievementActivity(
    achievementActivityParams: IAchievementActivityRequest
  ): Promise<AchievementActivity> {
    const { activity, achievementId } = achievementActivityParams;

    if (!achievementId)
      throw new ApplicationErrors('Id da conquista não informado', 400);

    const achievementRepository = await getCustomRepository(
      AchievementRepository
    );

    const achievement = await achievementRepository.findById(achievementId);

    if (!achievement)
      throw new ApplicationErrors('Conquista não encontrada', 404);

    const achievementActivity = this.create({ activity, achievement });

    return await this.save(achievementActivity);
  }

  async findAll(): Promise<AchievementActivity[]> {
    return await this.find({
      relations: ['achievement'],
    });
  }

  async findById(id: string): Promise<AchievementActivity> {
    return await this.findOne(
      { id },
      {
        relations: ['achievement'],
      }
    );
  }

  async updateById(updateFields: IAchievementActivityRequest): Promise<void> {
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
