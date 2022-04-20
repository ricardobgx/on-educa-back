import { Request, Response } from 'express';
import { IAlternativeRequest } from '../../dto/alternative/IAlternativeRequest';
import { AlternativeRepository } from '../../repositories/implementations/AlternativeRepository';
import { UpdateAlternativeService } from '../../services/alternative/UpdateAlternativeService';

class UpdateAlternativeController {
  async handle(req: Request, res: Response) {
    const { description, index, questionId } = req.body as IAlternativeRequest;

    const { id } = req.params;

    const updateAlternativeService = new UpdateAlternativeService(
      new AlternativeRepository()
    );

    await updateAlternativeService.execute({
      id,
      description,
      index,
      questionId,
    });

    return res.status(200).json({ message: 'Alternativa atualizada!' });
  }
}

export default new UpdateAlternativeController();
