import { Request, Response } from 'express';
import { MissionRepository } from '../../repositories/implementations/mission/MissionRepository';
import { DeleteMissionService } from '../../services/mission/DeleteMissionService';

class DeleteMissionController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteMissionService = new DeleteMissionService(
      new MissionRepository()
    );

    await deleteMissionService.execute(id);

    return res.status(200).json({ message: 'Mission removida' });
  }
}

export default new DeleteMissionController();
