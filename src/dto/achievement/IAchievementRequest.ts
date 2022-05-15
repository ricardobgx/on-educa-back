import { IAchievementActivityRequest } from '../achievementActivity/IAchievementActivityRequest';
import { IAchievementLevelRequest } from '../achievementLevel/IAchievementLevelRequest';

export interface IAchievementRequest {
  id?: string;
  name?: string;
  description?: string;
  isStudentAchievement?: boolean;
  levels?: IAchievementLevelRequest[];
  activities?: IAchievementActivityRequest[];
}
