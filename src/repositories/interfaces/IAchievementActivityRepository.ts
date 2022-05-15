import { IAchievementActivityRequest } from '../../dto/achievementActivity/IAchievementActivityRequest';
import AchievementActivity from '../../entities/AchievementActivity';

export interface IAchievementActivityRepository {
  createAchievementActivity(
    achievementActivityParams: IAchievementActivityRequest
  ): Promise<AchievementActivity>;
  findAll(): Promise<AchievementActivity[]>;
  findById(id: string): Promise<AchievementActivity | undefined>;
  updateById(updateFields: IAchievementActivityRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
