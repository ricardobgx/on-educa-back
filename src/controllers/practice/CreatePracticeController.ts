import { Request, Response } from 'express';

import { IPracticeRequest } from '../../dto/IPracticeRequest';
import { PracticeRepository } from '../../repositories/implementations/PracticeRepository';
import { CreatePracticeService } from '../../services/practice/CreatePracticeService';

class CreatePracticeController {
  async handle(req: Request, res: Response) {
    const { studentId, contentId } = req.body as IPracticeRequest;

    const createPracticeService = new CreatePracticeService(
      new PracticeRepository()
    );

    const practice = await createPracticeService.execute({
      studentId,
      contentId,
    });

    return res.status(201).json(practice);
  }
}

export default new CreatePracticeController();
