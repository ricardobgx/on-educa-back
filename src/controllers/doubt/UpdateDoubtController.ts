import { Request, Response } from 'express';
import { IDoubtRequest } from '../../dto/doubt/IDoubtRequest';
import { DoubtRepository } from '../../repositories/implementations/DoubtRepository';
import { UpdateDoubtService } from '../../services/doubt/UpdateDoubtService';

class UpdateDoubtController {
  async handle(req: Request, res: Response) {
    const { description, status } = req.body as IDoubtRequest;

    const { id } = req.params;

    const updateDoubtService = new UpdateDoubtService(new DoubtRepository());

    await updateDoubtService.execute({ id, description, status });

    return res.status(200).json({ message: 'Duvida atualizada!' });
  }
}

export default new UpdateDoubtController();
