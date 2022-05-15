import { Request, Response } from 'express';
import { IAchievementRequest } from '../../dto/achievement/IAchievementRequest';
import { AchievementRepository } from '../../repositories/implementations/AchievementRepository';
import { CreateAchievementService } from '../../services/achievement/CreateAchievementService';

class CreateAchievementController {
  async handle(req: Request, res: Response) {
    const createAchievementParams = req.body as IAchievementRequest;

    const createAchievementService = new CreateAchievementService(new AchievementRepository());

    const achievement = await createAchievementService.execute(createAchievementParams);

    return res.status(200).json(achievement);
  }
}

export default new CreateAchievementController();
