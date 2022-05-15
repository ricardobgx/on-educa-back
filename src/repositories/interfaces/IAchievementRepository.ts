import { IAchievementRequest } from '../../dto/achievement/IAchievementRequest';
import Achievement from '../../entities/Achievement';

export interface IAchievementRepository {
  createAchievement(achievementParams: IAchievementRequest): Promise<Achievement>;
  findAll(): Promise<Achievement[]>;
  findById(id: string): Promise<Achievement | undefined>;
  updateById(updateFields: IAchievementRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
