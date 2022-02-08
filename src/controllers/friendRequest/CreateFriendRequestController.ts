import { Request, Response } from 'express';

import { IFriendRequestRequest } from '../../dto/IFriendRequestRequest';
import { FriendRequestRepository } from '../../repositories/implementations/FriendRequestRepository';
import { CreateFriendRequestService } from '../../services/friendRequest/CreateFriendRequestService';

class CreateFriendRequestController {
  async handle(req: Request, res: Response) {
    const { requesterId, requestedId } = req.body as IFriendRequestRequest;

    const createFriendRequestService = new CreateFriendRequestService(
      new FriendRequestRepository()
    );

    const friendRequest = await createFriendRequestService.execute({
      requesterId,
      requestedId,
    });

    return res.status(201).json(friendRequest);
  }
}

export default new CreateFriendRequestController();
