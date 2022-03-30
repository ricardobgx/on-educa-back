import { Request, Response } from 'express';

import { IDoubtRequest } from '../../dto/doubt/IDoubtRequest';
import { DoubtRepository } from '../../repositories/implementations/DoubtRepository';
import { CreateDoubtService } from '../../services/doubt/CreateDoubtService';

class CreateDoubtController {
  async handle(req: Request, res: Response) {
    const { description, contentId, studentId } = req.body as IDoubtRequest;

    const createDoubtService = new CreateDoubtService(new DoubtRepository());

    const doubt = await createDoubtService.execute({
      description,
      contentId,
      studentId,
    });

    return res.status(201).json(doubt);
  }
}

export default new CreateDoubtController();
