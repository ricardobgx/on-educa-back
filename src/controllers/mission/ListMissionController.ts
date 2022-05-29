import { Request, Response } from 'express';
import { MissionRepository } from '../../repositories/implementations/mission/MissionRepository';
import { ListMissionService } from '../../services/mission/ListMissionService';

class ListMissionController {
  async handle(req: Request, res: Response) {
    const listMissionService = new ListMissionService(new MissionRepository());

    const missions = await listMissionService.execute();

    return res.status(200).json(missions);
  }
}

export default new ListMissionController();
