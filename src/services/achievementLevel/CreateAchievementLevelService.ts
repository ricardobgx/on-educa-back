import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementLevelRequest } from '../../dto/achievementLevel/IAchievementLevelRequest';
import AchievementLevel from '../../entities/AchievementLevel';
import { IAchievementLevelRepository } from '../../repositories/interfaces/IAchievementLevelRepository';

export class CreateAchievementLevelService {
  achievementLevelRepository: IAchievementLevelRepository;

  constructor(achievementLevelRepository: IAchievementLevelRepository) {
    this.achievementLevelRepository = achievementLevelRepository;
  }

  async execute(achievementLevelParams: IAchievementLevelRequest): Promise<AchievementLevel> {
    const achievementLevelRepository = getCustomRepository(
      this.achievementLevelRepository as unknown as ObjectType<IAchievementLevelRepository>
    );

    const achievementLevel = achievementLevelRepository.createAchievementLevel(achievementLevelParams);

    return achievementLevel;
  }
}
