import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { IAchievementRequest } from '../../dto/achievement/IAchievementRequest';
import Achievement from '../../entities/Achievement';
import { IAchievementRepository } from '../interfaces/IAchievementRepository';
import { AchievementActivityRepository } from './AchievementActivityRepository';
import { AchievementLevelRepository } from './AchievementLevelRepository';

@EntityRepository(Achievement)
export class AchievementRepository
  extends Repository<Achievement>
  implements IAchievementRepository
{
  async createAchievement(
    achievementParams: IAchievementRequest
  ): Promise<Achievement> {
    const { name, description, activities, isStudentAchievement, levels } =
      achievementParams;

    const newAchievementParams = this.create({
      name,
      description,
      isStudentAchievement,
    });

    const achievement = await this.save(newAchievementParams);

    const achievementActivityRepository = await getCustomRepository(
      AchievementActivityRepository
    );

    await Promise.all(
      activities.map(
        async (activity) =>
          await achievementActivityRepository.createAchievementActivity({
            activity: activity.activity,
            achievementId: achievement.id,
          })
      )
    );

    const achievementLevelRepository = await getCustomRepository(
      AchievementLevelRepository
    );

    await Promise.all(
      levels.map(
        async (level) =>
          await achievementLevelRepository.createAchievementLevel({
            goal: level.goal,
            level: level.level,
            achievementId: achievement.id,
          })
      )
    );

    return achievement;
  }

  async findAll(): Promise<Achievement[]> {
    return await this.find({
      relations: ['levels', 'activities'],
    });
  }

  async findById(id: string): Promise<Achievement> {
    return await this.findOne(
      { id },
      {
        relations: ['levels', 'activities'],
      }
    );
  }

  async updateById(updateFields: IAchievementRequest): Promise<void> {
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
