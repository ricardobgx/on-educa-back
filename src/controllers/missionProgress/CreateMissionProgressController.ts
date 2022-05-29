import { Request, Response } from 'express';
import { IMissionProgressRequest } from '../../dto/missionProgress/IMissionProgressRequest';
import { MissionProgressRepository } from '../../repositories/implementations/mission/MissionProgressRepository';
import { CreateMissionProgressService } from '../../services/missionProgress/CreateMissionProgressService';

class CreateMissionProgressController {
  async handle(req: Request, res: Response) {
    const createMissionProgressParams = req.body as IMissionProgressRequest;

    const createMissionProgressService = new CreateMissionProgressService(
      new MissionProgressRepository()
    );

    const missionProgress = await createMissionProgressService.execute(
      createMissionProgressParams
    );

    return res.status(200).json(missionProgress);
  }
}

export default new CreateMissionProgressController();
