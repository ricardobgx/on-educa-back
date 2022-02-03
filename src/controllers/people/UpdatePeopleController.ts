import { Request, Response } from 'express';
import { IPeopleRequest } from '../../dto/IPeopleRequest';
import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { UpdatePeopleService } from '../../services/people/UpdatePeopleService';

class UpdatePeopleController {
  async handle(req: Request, res: Response) {
    const { name, email, password, isOnline, isStudent, profilePictureId } =
      req.body as IPeopleRequest;

    const { id } = req.params;

    const updatePeopleService = new UpdatePeopleService(new PeopleRepository());

    await updatePeopleService.execute({
      id,
      email,
      name,
      password,
      isOnline,
      isStudent,
      profilePictureId,
    });

    return res.status(200).json({ message: 'Usuário atualizado!' });
  }
}

export default new UpdatePeopleController();
