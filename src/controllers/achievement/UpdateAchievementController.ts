import { Request, Response } from 'express';
import { IAchievementRequest } from '../../dto/achievement/IAchievementRequest';
import { AchievementRepository } from '../../repositories/implementations/AchievementRepository';
import { UpdateAchievementService } from '../../services/achievement/UpdateAchievementService';

class UpdateAchievementController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const updateParams = req.body as IAchievementRequest;

    const updateAchievementService = new UpdateAchievementService(new AchievementRepository());

    await updateAchievementService.execute({ ...updateParams, id });

    return res.status(200).json({ message: 'Conquista atualizada' });
  }
}

export default new UpdateAchievementController();
