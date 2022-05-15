import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementProgressRepository } from '../../repositories/interfaces/IAchievementProgressRepository';

export class DeleteAchievementProgressService {
  achievementProgressRepository: IAchievementProgressRepository;

  constructor(achievementProgressRepository: IAchievementProgressRepository) {
    this.achievementProgressRepository = achievementProgressRepository;
  }

  async execute(id: string): Promise<void> {
    const achievementProgressRepository = getCustomRepository(
      this
        .achievementProgressRepository as unknown as ObjectType<IAchievementProgressRepository>
    );

    await achievementProgressRepository.deleteById(id);
  }
}
