import { getCustomRepository, ObjectType } from 'typeorm';
import { FriendRequest } from '../../entities/FriendRequest';
import { IFriendRequestRepository } from '../../repositories/interfaces/IFriendRequestRepository';

export class ListFriendRequestByPeopleService {
  friendRequestRepository: IFriendRequestRepository;

  constructor(friendRequestRepository: IFriendRequestRepository) {
    this.friendRequestRepository = friendRequestRepository;
  }

  async execute(peopleId: string): Promise<FriendRequest[]> {
    const friendRequestRepository = getCustomRepository(
      this
        .friendRequestRepository as unknown as ObjectType<IFriendRequestRepository>
    );

    const friendRequests = await friendRequestRepository.findByPeople(peopleId);

    return friendRequests;
  }
}
