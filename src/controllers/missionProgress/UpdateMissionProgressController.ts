import { Request, Response } from 'express';
import { IMissionProgressRequest } from '../../dto/missionProgress/IMissionProgressRequest';
import { MissionProgressRepository } from '../../repositories/implementations/mission/MissionProgressRepository';
import { UpdateMissionProgressService } from '../../services/missionProgress/UpdateMissionProgressService';

class UpdateMissionProgressController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const updateParams = req.body as IMissionProgressRequest;

    const updateMissionProgressService = new UpdateMissionProgressService(
      new MissionProgressRepository()
    );

    await updateMissionProgressService.execute({ ...updateParams, id });

    return res.status(200).json({ message: 'MissionProgress atualizada' });
  }
}

export default new UpdateMissionProgressController();
