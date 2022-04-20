import { Request, Response } from 'express';
import { FriendRequestRepository } from '../../repositories/implementations/FriendRequestRepository';
import { ShowFriendRequestService } from '../../services/friendRequest/ShowFriendRequestService';

class ShowFriendRequestController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showFriendRequestService = new ShowFriendRequestService(
      new FriendRequestRepository()
    );

    const friendRequest = await showFriendRequestService.execute(id);

    return res.status(200).json(friendRequest);
  }
}

export default new ShowFriendRequestController();
