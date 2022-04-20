import { getCustomRepository, ObjectType } from 'typeorm';
import { FriendRequest } from '../../entities/FriendRequest';
import { ApplicationErrors } from '../../errors';
import { IFriendRequestRepository } from '../../repositories/interfaces/IFriendRequestRepository';

export class ShowFriendRequestService {
  friendRequestRepository: IFriendRequestRepository;

  constructor(friendRequestRepository: IFriendRequestRepository) {
    this.friendRequestRepository = friendRequestRepository;
  }

  async execute(id: string): Promise<FriendRequest> {
    const friendRequestRepository = getCustomRepository(
      this
        .friendRequestRepository as unknown as ObjectType<IFriendRequestRepository>
    );

    const friendRequest = await friendRequestRepository.findById(id);

    if (!friendRequest)
      throw new ApplicationErrors('Solicitação não existe', 404);

    return friendRequest;
  }
}
