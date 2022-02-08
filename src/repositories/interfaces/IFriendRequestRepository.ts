import { DeleteResult } from 'typeorm';
import { IFriendRequestRequest } from '../../dto/IFriendRequestRequest';
import { FriendRequest } from '../../entities/FriendRequest';

export interface IFriendRequestRepository {
  createFriendRequest(
    friendRequestParams: IFriendRequestRequest
  ): Promise<FriendRequest>;
  findAll(name?: string): Promise<FriendRequest[]>;
  findByPeople(peopleId: string): Promise<FriendRequest[]>;
  findById(id: string): Promise<FriendRequest | undefined>;
  updateById(updateFields: IFriendRequestRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
  acceptFriendRequest(id: string): Promise<void>;
}
