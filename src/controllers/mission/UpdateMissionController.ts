import { Request, Response } from 'express';
import { IMissionRequest } from '../../dto/mission/IMissionRequest';
import { MissionRepository } from '../../repositories/implementations/mission/MissionRepository';
import { UpdateMissionService } from '../../services/mission/UpdateMissionService';

class UpdateMissionController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const updateParams = req.body as IMissionRequest;

    const updateMissionService = new UpdateMissionService(
      new MissionRepository()
    );

    await updateMissionService.execute({ ...updateParams, id });

    return res.status(200).json({ message: 'Missão atualizada' });
  }
}

export default new UpdateMissionController();
