import { Request, Response } from 'express';
import { IMissionRequest } from '../../dto/mission/IMissionRequest';
import { MissionRepository } from '../../repositories/implementations/mission/MissionRepository';
import { CreateMissionService } from '../../services/mission/CreateMissionService';

class CreateMissionController {
  async handle(req: Request, res: Response) {
    const createMissionParams = req.body as IMissionRequest;

    const createMissionService = new CreateMissionService(
      new MissionRepository()
    );

    const mission = await createMissionService.execute(createMissionParams);

    return res.status(200).json(mission);
  }
}

export default new CreateMissionController();
