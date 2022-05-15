import { Request, Response } from 'express';
import { AchievementRepository } from '../../repositories/implementations/AchievementRepository';
import { DeleteAchievementService } from '../../services/achievement/DeleteAchievementService';

class DeleteAchievementController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteAchievementService = new DeleteAchievementService(new AchievementRepository());

    await deleteAchievementService.execute(id);

    return res.status(200).json({ message: 'Achievement removida' });
  }
}

export default new DeleteAchievementController();
