import { Request, Response } from 'express';
import { MissionProgressRepository } from '../../repositories/implementations/mission/MissionProgressRepository';
import { DeleteMissionProgressService } from '../../services/missionProgress/DeleteMissionProgressService';

class DeleteMissionProgressController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteMissionProgressService = new DeleteMissionProgressService(
      new MissionProgressRepository()
    );

    await deleteMissionProgressService.execute(id);

    return res.status(200).json({ message: 'MissionProgress removida' });
  }
}

export default new DeleteMissionProgressController();
