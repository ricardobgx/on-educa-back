import { Request, Response } from 'express';
import { AchievementProgressRepository } from '../../repositories/implementations/AchievementProgressRepository';
import { ListAchievementProgressService } from '../../services/achievementProgress/ListAchievementProgressService';

class ListAchievementProgressController {
  async handle(req: Request, res: Response) {
    const listAchievementProgressService = new ListAchievementProgressService(
      new AchievementProgressRepository()
    );

    const achievementProgress = await listAchievementProgressService.execute();

    return res.status(200).json(achievementProgress);
  }
}

export default new ListAchievementProgressController();
