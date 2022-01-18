import { Request, Response } from 'express';
import { PracticeRepository } from '../../repositories/implementations/PracticeRepository';
import { DeletePracticeService } from '../../services/practice/DeletePracticeService';

class DeletePracticeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deletePracticeService = new DeletePracticeService(
      new PracticeRepository()
    );

    await deletePracticeService.execute(id);

    return res.status(200).json({ message: 'Prática removida!' });
  }
}

export default new DeletePracticeController();
