import { Request, Response } from "express";
import { AchievementLevelRepository } from "../../repositories/implementations/AchievementLevelRepository";
import { ListAchievementLevelService } from '../../services/achievementLevel/ListAchievementLevelService';

class ListAchievementLevelController {
  async handle(req: Request, res: Response) {
    const listAchievementLevelService = new ListAchievementLevelService(new AchievementLevelRepository());

    const achievementLevels = await listAchievementLevelService.execute();

    return res.status(200).json(achievementLevels);
  }
}

export default new ListAchievementLevelController();