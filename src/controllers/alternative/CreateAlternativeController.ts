import { Request, Response } from 'express';

import { IAlternativeRequest } from '../../dto/alternative/IAlternativeRequest';
import { AlternativeRepository } from '../../repositories/implementations/AlternativeRepository';
import { CreateAlternativeService } from '../../services/alternative/CreateAlternativeService';

class CreateAlternativeController {
  async handle(req: Request, res: Response) {
    const { description, index, questionId } = req.body as IAlternativeRequest;

    const createAlternativeService = new CreateAlternativeService(
      new AlternativeRepository()
    );

    const alternative = await createAlternativeService.execute({
      description,
      index,
      questionId,
    });

    return res.status(201).json(alternative);
  }
}

export default new CreateAlternativeController();
