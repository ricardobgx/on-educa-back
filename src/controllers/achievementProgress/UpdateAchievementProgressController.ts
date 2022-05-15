import { Request, Response } from 'express';
import { IAchievementProgressRequest } from '../../dto/achievementProgress/IAchievementProgressRequest';
import { AchievementProgressRepository } from '../../repositories/implementations/AchievementProgressRepository';
import { UpdateAchievementProgressService } from '../../services/achievementProgress/UpdateAchievementProgressService';

class UpdateAchievementProgressController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const updateParams = req.body as IAchievementProgressRequest;

    const updateAchievementProgressService =
      new UpdateAchievementProgressService(new AchievementProgressRepository());

    await updateAchievementProgressService.execute({ ...updateParams, id });

    return res.status(200).json({ message: 'AchievementProgress atualizada' });
  }
}

export default new UpdateAchievementProgressController();
