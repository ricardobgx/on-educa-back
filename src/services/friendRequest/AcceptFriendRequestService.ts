import { getCustomRepository, ObjectType } from 'typeorm';
import { IFriendRequestRepository } from '../../repositories/interfaces/IFriendRequestRepository';

export class AcceptFriendRequestService {
  friendRequestRepository: IFriendRequestRepository;

  constructor(friendRequestRepository: IFriendRequestRepository) {
    this.friendRequestRepository = friendRequestRepository;
  }

  async execute(id: string): Promise<void> {
    const friendRequestRepository = getCustomRepository(
      this
        .friendRequestRepository as unknown as ObjectType<IFriendRequestRepository>
    );

    await friendRequestRepository.acceptFriendRequest(id);
  }
}
