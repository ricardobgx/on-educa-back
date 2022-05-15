import { getCustomRepository, ObjectType } from 'typeorm';
import AchievementProgress from '../../entities/AchievementProgress';
import { IAchievementProgressRepository } from '../../repositories/interfaces/IAchievementProgressRepository';

export class ListAchievementProgressService {
  achievementProgressRepository: IAchievementProgressRepository;

  constructor(achievementProgressRepository: IAchievementProgressRepository) {
    this.achievementProgressRepository = achievementProgressRepository;
  }

  async execute(): Promise<AchievementProgress[]> {
    const achievementProgressRepository = getCustomRepository(
      this
        .achievementProgressRepository as unknown as ObjectType<IAchievementProgressRepository>
    );

    const units = achievementProgressRepository.findAll();

    return units;
  }
}
