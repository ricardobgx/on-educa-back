import { Request, Response } from 'express';
import { AchievementProgressRepository } from '../../repositories/implementations/AchievementProgressRepository';
import { ShowAchievementProgressByPeopleAndAchievementService } from '../../services/achievementProgress/ShowAchievementProgressByPeopleAndAchievementService';

class ShowAchievementProgressByPeopleAndAchievementController {
  async handle(req: Request, res: Response) {
    const { peopleId, achievementId } = req.params;
    const searchParams = { peopleId, achievementId };

    const showAchievementProgressByPeopleAndAchievementService =
      new ShowAchievementProgressByPeopleAndAchievementService(
        new AchievementProgressRepository()
      );

    const achievementProgress =
      await showAchievementProgressByPeopleAndAchievementService.execute(
        searchParams
      );

    return res.status(200).json(achievementProgress);
  }
}

export default new ShowAchievementProgressByPeopleAndAchievementController();
