import { Request, Response } from 'express';
import { IMissionProgressSearchParams } from '../../dto/missionProgress/IMissionProgressSearchParams';
import { MissionProgressRepository } from '../../repositories/implementations/mission/MissionProgressRepository';
import { ListMissionProgressService } from '../../services/missionProgress/ListMissionProgressService';

class ListMissionProgressController {
  async handle(req: Request, res: Response) {
    const searchParams = req.query as IMissionProgressSearchParams;

    const listMissionProgressService = new ListMissionProgressService(
      new MissionProgressRepository()
    );

    const missionProgress = await listMissionProgressService.execute(
      searchParams
    );

    return res.status(200).json(missionProgress);
  }
}

export default new ListMissionProgressController();
