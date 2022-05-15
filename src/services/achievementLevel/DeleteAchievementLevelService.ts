import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementLevelRepository } from '../../repositories/interfaces/IAchievementLevelRepository';

export class DeleteAchievementLevelService {
  achievementLevelRepository: IAchievementLevelRepository;

  constructor(achievementLevelRepository: IAchievementLevelRepository) {
    this.achievementLevelRepository = achievementLevelRepository;
  }

  async execute(id: string): Promise<void> {
    const achievementLevelRepository = getCustomRepository(
      this.achievementLevelRepository as unknown as ObjectType<IAchievementLevelRepository>
    );

    await achievementLevelRepository.deleteById(id);
  }
}
