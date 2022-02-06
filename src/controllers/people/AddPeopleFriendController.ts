import { Request, Response } from 'express';
import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { AddPeopleFriendService } from '../../services/people/AddPeopleFriendService';

class AddPeopleFriendController {
  async handle(req: Request, res: Response) {
    const { friendId } = req.body;

    const { id: peopleId } = req.params;

    const updatePeopleService = new AddPeopleFriendService(
      new PeopleRepository()
    );

    await updatePeopleService.execute({
      peopleId,
      friendId,
    });

    return res.status(200).json({ message: 'Amigo adicionado!' });
  }
}

export default new AddPeopleFriendController();
