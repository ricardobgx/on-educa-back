import { Request, Response } from 'express';
import { IDuelRoundRequest } from '../../dto/duelRound/IDuelRoundRequest';
import { DuelRoundRepository } from '../../repositories/implementations/DuelRoundRepository';
import { UpdateDuelRoundService } from '../../services/duelRound/UpdateDuelRoundService';

class UpdateDuelRoundController {
  async handle(req: Request, res: Response) {
    const {
      maxGroupParticipants,
      questionsPerContent,
      timeForQuestion,
      status,
    } = req.body as IDuelRoundRequest;

    const { id } = req.params;

    const updateDuelRoundService = new UpdateDuelRoundService(
      new DuelRoundRepository()
    );

    await updateDuelRoundService.execute({
      id,
      maxGroupParticipants,
      questionsPerContent,
      timeForQuestion,
      status,
    });

    return res.status(200).json({ message: 'Entidade atualizada!' });
  }
}

export default new UpdateDuelRoundController();
