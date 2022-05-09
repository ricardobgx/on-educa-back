import { Request, Response } from 'express';
import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { DeletePeopleService } from '../../services/people/DeletePeopleService';

class DeletePeopleController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deletePeopleService = new DeletePeopleService(new PeopleRepository());

    await deletePeopleService.execute(id);

    return res.status(200).json({ message: 'Usuário removido!' });
  }
}

export default new DeletePeopleController();
