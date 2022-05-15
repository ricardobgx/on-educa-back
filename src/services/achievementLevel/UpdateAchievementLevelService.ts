import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementLevelRequest } from '../../dto/achievementLevel/IAchievementLevelRequest';
import { IAchievementLevelRepository } from '../../repositories/interfaces/IAchievementLevelRepository';

export class UpdateAchievementLevelService {
  achievementLevelRepository: IAchievementLevelRepository;

  constructor(achievementLevelRepository: IAchievementLevelRepository) {
    this.achievementLevelRepository = achievementLevelRepository;
  }

  async execute(achievementLevelParams: IAchievementLevelRequest): Promise<void> {
    const achievementLevelRepository = getCustomRepository(
      this.achievementLevelRepository as unknown as ObjectType<IAchievementLevelRepository>
    );

    await achievementLevelRepository.updateById(achievementLevelParams);
  }
}
