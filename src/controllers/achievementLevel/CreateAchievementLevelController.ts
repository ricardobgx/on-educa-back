import { Request, Response } from 'express';
import { IAchievementLevelRequest } from '../../dto/achievementLevel/IAchievementLevelRequest';
import { AchievementLevelRepository } from '../../repositories/implementations/AchievementLevelRepository';
import { CreateAchievementLevelService } from '../../services/achievementLevel/CreateAchievementLevelService';

class CreateAchievementLevelController {
  async handle(req: Request, res: Response) {
    const createAchievementLevelParams = req.body as IAchievementLevelRequest;

    const createAchievementLevelService = new CreateAchievementLevelService(new AchievementLevelRepository());

    const achievementLevel = await createAchievementLevelService.execute(createAchievementLevelParams);

    return res.status(200).json(achievementLevel);
  }
}

export default new CreateAchievementLevelController();
