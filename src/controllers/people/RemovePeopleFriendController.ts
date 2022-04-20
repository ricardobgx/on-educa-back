import { Request, Response } from 'express';
import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { RemovePeopleFriendService } from '../../services/people/RemovePeopleFriendService';

class RemovePeopleFriendController {
  async handle(req: Request, res: Response) {
    const { friendId } = req.body;

    const { id: peopleId } = req.params;

    const updatePeopleService = new RemovePeopleFriendService(
      new PeopleRepository()
    );

    await updatePeopleService.execute({
      peopleId,
      friendId,
    });

    return res.status(200).json({ message: 'Amigo removido!' });
  }
}

export default new RemovePeopleFriendController();
