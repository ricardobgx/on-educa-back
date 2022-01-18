import { Request, Response } from 'express';
import { PracticeRepository } from '../../repositories/implementations/PracticeRepository';
import { ShowPracticeService } from '../../services/practice/ShowPracticeService';

class ShowPracticeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showPracticeService = new ShowPracticeService(
      new PracticeRepository()
    );

    const practice = await showPracticeService.execute(id);

    return res.status(200).json(practice);
  }
}

export default new ShowPracticeController();
