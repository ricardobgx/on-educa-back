import { getCustomRepository, ObjectType } from 'typeorm';
import { IAchievementRepository } from '../../repositories/interfaces/IAchievementRepository';

export class DeleteAchievementService {
  achievementRepository: IAchievementRepository;

  constructor(achievementRepository: IAchievementRepository) {
    this.achievementRepository = achievementRepository;
  }

  async execute(id: string): Promise<void> {
    const achievementRepository = getCustomRepository(
      this.achievementRepository as unknown as ObjectType<IAchievementRepository>
    );

    await achievementRepository.deleteById(id);
  }
}
