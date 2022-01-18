import { Request, Response } from 'express';
import { PracticeRepository } from '../../repositories/implementations/PracticeRepository';
import { ListPracticeService } from '../../services/practice/ListPracticeService';

class ListPracticeController {
  async handle(req: Request, res: Response) {
    const listPracticeService = new ListPracticeService(
      new PracticeRepository()
    );

    const practices = await listPracticeService.execute();

    return res.status(200).json(practices);
  }
}

export default new ListPracticeController();
