import { Request, Response } from 'express';
import { AchievementProgressRepository } from '../../repositories/implementations/AchievementProgressRepository';
import { DeleteAchievementProgressService } from '../../services/achievementProgress/DeleteAchievementProgressService';

class DeleteAchievementProgressController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteAchievementProgressService =
      new DeleteAchievementProgressService(new AchievementProgressRepository());

    await deleteAchievementProgressService.execute(id);

    return res.status(200).json({ message: 'AchievementProgress removida' });
  }
}

export default new DeleteAchievementProgressController();
