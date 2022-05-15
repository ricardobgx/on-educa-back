import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementProgressRequest } from '../../dto/achievementProgress/IAchievementProgressRequest';
import { IAchievementProgressRepository } from '../../repositories/interfaces/IAchievementProgressRepository';

export class UpdateAchievementProgressService {
  achievementProgressRepository: IAchievementProgressRepository;

  constructor(achievementProgressRepository: IAchievementProgressRepository) {
    this.achievementProgressRepository = achievementProgressRepository;
  }

  async execute(
    achievementProgressParams: IAchievementProgressRequest
  ): Promise<void> {
    const achievementProgressRepository = getCustomRepository(
      this
        .achievementProgressRepository as unknown as ObjectType<IAchievementProgressRepository>
    );

    await achievementProgressRepository.updateById(achievementProgressParams);
  }
}
