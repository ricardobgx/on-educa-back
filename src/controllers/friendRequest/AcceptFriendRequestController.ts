import { Request, Response } from 'express';
import { FriendRequestRepository } from '../../repositories/implementations/FriendRequestRepository';
import { AcceptFriendRequestService } from '../../services/friendRequest/AcceptFriendRequestService';

class AcceptFriendRequestController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const createFriendRequestService = new AcceptFriendRequestService(
      new FriendRequestRepository()
    );

    await createFriendRequestService.execute(id);

    return res.status(200).json();
  }
}

export default new AcceptFriendRequestController();
