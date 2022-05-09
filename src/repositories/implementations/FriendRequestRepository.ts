import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IFriendRequestRequest } from '../../dto/friendRequest/IFriendRequestRequest';
import { FriendRequest } from '../../entities/FriendRequest';
import { ApplicationErrors } from '../../errors';
import { IFriendRequestRepository } from '../interfaces/IFriendRequestRepository';
import { PeopleRepository } from './PeopleRepository';

@EntityRepository(FriendRequest)
export class FriendRequestRepository
  extends Repository<FriendRequest>
  implements IFriendRequestRepository
{
  async createFriendRequest(
    friendRequestParams: IFriendRequestRequest
  ): Promise<FriendRequest> {
    const { requesterId, requestedId } = friendRequestParams;

    if (!requesterId || !requestedId) {
      throw new ApplicationErrors('Pessoas não informadas', 400);
    }

    const peopleRepository = await getCustomRepository(PeopleRepository);

    const requester = await peopleRepository.findById(requesterId);
    if (!requester) {
      throw new ApplicationErrors('Solicitante não encontrado', 404);
    }

    const requested = await peopleRepository.findById(requestedId);
    if (!requested) {
      throw new ApplicationErrors('Solicitado não encontrado', 404);
    }

    // Salva a pratica na base de dados e retorna
    return await this.save({ requester, requested });
  }

  async findAll(): Promise<FriendRequest[]> {
    return await this.find({
      relations: ['requester', 'requested'],
    });
  }

  async findByPeople(peopleId: string): Promise<FriendRequest[]> {
    const peopleRepository = await getCustomRepository(PeopleRepository);
    const people = await peopleRepository.findById(peopleId);

    const requesteds = await this.find({
      relations: ['requester', 'requested'],
      where: { requested: people },
    });

    const requesters = await this.find({
      relations: ['requester', 'requested'],
      where: { requester: people },
    });

    return requesteds.concat(requesters);
  }

  async findById(id: string): Promise<FriendRequest | undefined> {
    const FriendRequest = await this.findOne(
      { id },
      { relations: ['requester', 'requested'] }
    );

    return FriendRequest;
  }

  async updateById(updateFields: IFriendRequestRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key: string) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    await this.update({ id }, { requester: null, requested: null });
    return await this.delete({ id });
  }

  async acceptFriendRequest(id: string): Promise<void> {
    const friendRequest = await this.findById(id);

    if (!friendRequest) {
      throw new ApplicationErrors('Solicitação não encontrada', 404);
    }

    const { requester, requested } = friendRequest;

    const peopleRepository = await getCustomRepository(PeopleRepository);

    await peopleRepository.addFriend({
      peopleId: requested.id,
      friendId: requester.id,
    });

    await this.deleteById(id);
  }
}
