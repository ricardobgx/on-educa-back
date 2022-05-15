import { Request, Response } from 'express';
import { AchievementLevelRepository } from '../../repositories/implementations/AchievementLevelRepository';
import { DeleteAchievementLevelService } from '../../services/achievementLevel/DeleteAchievementLevelService';

class DeleteAchievementLevelController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteAchievementLevelService = new DeleteAchievementLevelService(new AchievementLevelRepository());

    await deleteAchievementLevelService.execute(id);

    return res.status(200).json({ message: 'Nível de conquista removido' });
  }
}

export default new DeleteAchievementLevelController();
