import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementRequest } from '../../dto/achievement/IAchievementRequest';
import { IAchievementRepository } from '../../repositories/interfaces/IAchievementRepository';

export class UpdateAchievementService {
  achievementRepository: IAchievementRepository;

  constructor(achievementRepository: IAchievementRepository) {
    this.achievementRepository = achievementRepository;
  }

  async execute(achievementParams: IAchievementRequest): Promise<void> {
    const achievementRepository = getCustomRepository(
      this.achievementRepository as unknown as ObjectType<IAchievementRepository>
    );

    await achievementRepository.updateById(achievementParams);
  }
}
