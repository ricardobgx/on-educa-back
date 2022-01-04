import { Request, Response } from 'express';

import { AlternativeRepository } from '../../repositories/implementations/AlternativeRepository';
import { CreateManyAlternativesService } from '../../services/alternative/CreateManyAlternativesService';

class CreateManyAlternativesController {
  async handle(req: Request, res: Response) {
    const { alternativesDescriptions, questionId } = req.body;

    const createManyAlternativesService = new CreateManyAlternativesService(
      new AlternativeRepository()
    );

    const alternatives = await createManyAlternativesService.execute({
      alternativesDescriptions,
      questionId,
    });

    return res.status(201).json(alternatives);
  }
}

export default new CreateManyAlternativesController();
