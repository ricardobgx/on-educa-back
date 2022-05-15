import { IAchievementProgressByPeopleAndAchievement } from '../../dto/achievementProgress/IAchievementProgressByPeopleAndAchievement';
import { IAchievementProgressRequest } from '../../dto/achievementProgress/IAchievementProgressRequest';
import AchievementProgress from '../../entities/AchievementProgress';

export interface IAchievementProgressRepository {
  createAchievementProgress(
    achievementProgressParams: IAchievementProgressRequest
  ): Promise<AchievementProgress>;
  findAll(): Promise<AchievementProgress[]>;
  findByAchievementAndPeople(
    searchParams: IAchievementProgressByPeopleAndAchievement
  ): Promise<AchievementProgress>;
  findById(id: string): Promise<AchievementProgress | undefined>;
  updateById(updateFields: IAchievementProgressRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
