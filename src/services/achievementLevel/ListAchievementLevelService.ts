import { getCustomRepository, ObjectType } from "typeorm";
import AchievementLevel from "../../entities/AchievementLevel";
import { IAchievementLevelRepository } from "../../repositories/interfaces/IAchievementLevelRepository";

export class ListAchievementLevelService {
  achievementLevelRepository: IAchievementLevelRepository;

  constructor(achievementLevelRepository: IAchievementLevelRepository) {
    this.achievementLevelRepository = achievementLevelRepository;
  }

  async execute(): Promise<AchievementLevel[]> {
    const achievementLevelRepository = getCustomRepository(this.achievementLevelRepository as unknown as ObjectType<IAchievementLevelRepository>);

    const units = achievementLevelRepository.findAll();

    return units;
  }
}