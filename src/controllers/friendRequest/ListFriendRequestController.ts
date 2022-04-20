import { Request, Response } from 'express';
import { FriendRequestRepository } from '../../repositories/implementations/FriendRequestRepository';
import { ListFriendRequestService } from '../../services/friendRequest/ListFriendRequestService';

class ListFriendRequestController {
  async handle(req: Request, res: Response) {
    const listFriendRequestService = new ListFriendRequestService(
      new FriendRequestRepository()
    );

    const friendRequests = await listFriendRequestService.execute();

    return res.status(200).json(friendRequests);
  }
}

export default new ListFriendRequestController();
