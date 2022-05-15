import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementProgressRequest } from '../../dto/achievementProgress/IAchievementProgressRequest';
import AchievementProgress from '../../entities/AchievementProgress';
import { IAchievementProgressRepository } from '../../repositories/interfaces/IAchievementProgressRepository';

export class CreateAchievementProgressService {
  achievementProgressRepository: IAchievementProgressRepository;

  constructor(achievementProgressRepository: IAchievementProgressRepository) {
    this.achievementProgressRepository = achievementProgressRepository;
  }

  async execute(
    achievementProgressParams: IAchievementProgressRequest
  ): Promise<AchievementProgress> {
    const achievementProgressRepository = getCustomRepository(
      this
        .achievementProgressRepository as unknown as ObjectType<IAchievementProgressRepository>
    );

    const achievementProgress =
      achievementProgressRepository.createAchievementProgress(
        achievementProgressParams
      );

    return achievementProgress;
  }
}
