import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementRequest } from '../../dto/achievement/IAchievementRequest';
import Achievement from '../../entities/Achievement';
import { IAchievementRepository } from '../../repositories/interfaces/IAchievementRepository';

export class CreateAchievementService {
  achievementRepository: IAchievementRepository;

  constructor(achievementRepository: IAchievementRepository) {
    this.achievementRepository = achievementRepository;
  }

  async execute(achievementParams: IAchievementRequest): Promise<Achievement> {
    const achievementRepository = getCustomRepository(
      this.achievementRepository as unknown as ObjectType<IAchievementRepository>
    );

    const achievement = achievementRepository.createAchievement(achievementParams);

    return achievement;
  }
}
