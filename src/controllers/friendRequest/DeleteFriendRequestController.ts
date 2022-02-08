import { Request, Response } from 'express';
import { FriendRequestRepository } from '../../repositories/implementations/FriendRequestRepository';
import { DeleteFriendRequestService } from '../../services/friendRequest/DeleteFriendRequestService';

class DeleteFriendRequestController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteFriendRequestService = new DeleteFriendRequestService(
      new FriendRequestRepository()
    );

    await deleteFriendRequestService.execute(id);

    return res.status(200).json({ message: 'Solicitação removida!' });
  }
}

export default new DeleteFriendRequestController();
