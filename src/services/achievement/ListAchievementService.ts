import { getCustomRepository, ObjectType } from "typeorm";
import Achievement from "../../entities/Achievement";
import { IAchievementRepository } from "../../repositories/interfaces/IAchievementRepository";

export class ListAchievementService {
  achievementRepository: IAchievementRepository;

  constructor(achievementRepository: IAchievementRepository) {
    this.achievementRepository = achievementRepository;
  }

  async execute(): Promise<Achievement[]> {
    const achievementRepository = getCustomRepository(this.achievementRepository as unknown as ObjectType<IAchievementRepository>);

    const units = achievementRepository.findAll();

    return units;
  }
}