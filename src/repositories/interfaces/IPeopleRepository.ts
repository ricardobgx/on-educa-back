import { DeleteResult } from 'typeorm';
import { IUpdateFriendRequest } from '../../dto/friendRequest/IUpdateFriendRequest';
import { IPeopleRequest } from '../../dto/people/IPeopleRequest';
import { People } from '../../entities/People';

export interface IPeopleRepository {
  createPeople(peopleParams: IPeopleRequest): Promise<People>;
  findAll(): Promise<People[]>;
  findById(id: string): Promise<People | undefined>;
  findByEmail(email: string): Promise<People | undefined>;
  updateById(updateFields: IPeopleRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
  addFriend(addFriendParams: IUpdateFriendRequest): Promise<void>;
  removeFriend(removeFriendParams: IUpdateFriendRequest): Promise<void>;
}
