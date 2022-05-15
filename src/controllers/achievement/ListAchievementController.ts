import { Request, Response } from "express";
import { AchievementRepository } from "../../repositories/implementations/AchievementRepository";
import { ListAchievementService } from '../../services/achievement/ListAchievementService';

class ListAchievementController {
  async handle(req: Request, res: Response) {
    const listAchievementService = new ListAchievementService(new AchievementRepository());

    const achievements = await listAchievementService.execute();

    return res.status(200).json(achievements);
  }
}

export default new ListAchievementController();