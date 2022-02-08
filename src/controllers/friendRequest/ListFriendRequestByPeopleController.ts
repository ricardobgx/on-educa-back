import { Request, Response } from 'express';
import { FriendRequestRepository } from '../../repositories/implementations/FriendRequestRepository';
import { ListFriendRequestByPeopleService } from '../../services/friendRequest/ListFriendRequestByPeopleService';

class ListFriendRequestByPeopleController {
  async handle(req: Request, res: Response) {
    const { peopleId } = req.params;

    console.log(`Pegando solicitações de ${peopleId}`);

    const listFriendRequestByPeopleService =
      new ListFriendRequestByPeopleService(new FriendRequestRepository());

    const friendRequests = await listFriendRequestByPeopleService.execute(
      peopleId
    );

    return res.status(200).json(friendRequests);
  }
}

export default new ListFriendRequestByPeopleController();
