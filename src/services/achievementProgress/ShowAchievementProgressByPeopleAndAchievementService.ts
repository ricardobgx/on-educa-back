import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementProgressByPeopleAndAchievement } from '../../dto/achievementProgress/IAchievementProgressByPeopleAndAchievement';
import AchievementProgress from '../../entities/AchievementProgress';
import { IAchievementProgressRepository } from '../../repositories/interfaces/IAchievementProgressRepository';

export class ShowAchievementProgressByPeopleAndAchievementService {
  achievementProgressRepository: IAchievementProgressRepository;

  constructor(achievementProgressRepository: IAchievementProgressRepository) {
    this.achievementProgressRepository = achievementProgressRepository;
  }

  async execute(
    searchParams: IAchievementProgressByPeopleAndAchievement
  ): Promise<AchievementProgress> {
    const achievementProgressRepository = getCustomRepository(
      this
        .achievementProgressRepository as unknown as ObjectType<IAchievementProgressRepository>
    );

    return await achievementProgressRepository.findByAchievementAndPeople(
      searchParams
    );
  }
}
