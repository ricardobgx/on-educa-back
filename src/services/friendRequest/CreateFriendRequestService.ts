import { getCustomRepository, ObjectType } from 'typeorm';
import { IFriendRequestRequest } from '../../dto/friendRequest/IFriendRequestRequest';
import { FriendRequest } from '../../entities/FriendRequest';
import { IFriendRequestRepository } from '../../repositories/interfaces/IFriendRequestRepository';

export class CreateFriendRequestService {
  friendRequestRepository: IFriendRequestRepository;

  constructor(friendRequestRepository: IFriendRequestRepository) {
    this.friendRequestRepository = friendRequestRepository;
  }

  async execute(
    friendRequestParams: IFriendRequestRequest
  ): Promise<FriendRequest> {
    const friendRequestRepository = getCustomRepository(
      this
        .friendRequestRepository as unknown as ObjectType<IFriendRequestRepository>
    );

    const friendRequest = await friendRequestRepository.createFriendRequest(
      friendRequestParams
    );

    return friendRequest;
  }
}
