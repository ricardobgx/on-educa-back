import { Request, Response } from 'express';
import { IAchievementLevelRequest } from '../../dto/achievementLevel/IAchievementLevelRequest';
import { AchievementLevelRepository } from '../../repositories/implementations/AchievementLevelRepository';
import { UpdateAchievementLevelService } from '../../services/achievementLevel/UpdateAchievementLevelService';

class UpdateAchievementLevelController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const updateParams = req.body as IAchievementLevelRequest;

    const updateAchievementLevelService = new UpdateAchievementLevelService(new AchievementLevelRepository());

    await updateAchievementLevelService.execute({ ...updateParams, id });

    return res.status(200).json({ message: 'Nível de conquista atualizado' });
  }
}

export default new UpdateAchievementLevelController();
