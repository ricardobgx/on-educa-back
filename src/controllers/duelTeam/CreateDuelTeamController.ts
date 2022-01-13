import { Request, Response } from 'express';
import { IDuelTeamRequest } from '../../dto/IDuelTeamRequest';
import { DuelTeamRepository } from '../../repositories/implementations/DuelTeamRepository';
import { CreateDuelTeamService } from '../../services/duelTeam/CreateDuelTeamService';

class CreateDuelTeamController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { index, name } = req.body as IDuelTeamRequest;

    const createDuelTeamService = new CreateDuelTeamService(
      new DuelTeamRepository()
    );

    const duelTeam = await createDuelTeamService.execute({
      id,
      index,
      name,
    });

    return res.status(201).json(duelTeam);
  }
}

export default new CreateDuelTeamController();
