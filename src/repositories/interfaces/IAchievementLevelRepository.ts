import { IAchievementLevelRequest } from '../../dto/achievementLevel/IAchievementLevelRequest';
import AchievementLevel from '../../entities/AchievementLevel';

export interface IAchievementLevelRepository {
  createAchievementLevel(achievementLevelParams: IAchievementLevelRequest): Promise<AchievementLevel>;
  findAll(): Promise<AchievementLevel[]>;
  findById(id: string): Promise<AchievementLevel | undefined>;
  updateById(updateFields: IAchievementLevelRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
