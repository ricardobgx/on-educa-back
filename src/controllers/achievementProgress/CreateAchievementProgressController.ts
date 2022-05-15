import { Request, Response } from 'express';
import { IAchievementProgressRequest } from '../../dto/achievementProgress/IAchievementProgressRequest';
import { AchievementProgressRepository } from '../../repositories/implementations/AchievementProgressRepository';
import { CreateAchievementProgressService } from '../../services/achievementProgress/CreateAchievementProgressService';

class CreateAchievementProgressController {
  async handle(req: Request, res: Response) {
    const createAchievementProgressParams =
      req.body as IAchievementProgressRequest;

    const createAchievementProgressService =
      new CreateAchievementProgressService(new AchievementProgressRepository());

    const achievementProgress = await createAchievementProgressService.execute(
      createAchievementProgressParams
    );

    return res.status(200).json(achievementProgress);
  }
}

export default new CreateAchievementProgressController();
