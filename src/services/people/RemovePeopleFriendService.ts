import { getCustomRepository, ObjectType } from 'typeorm';
import { IUpdateFriendRequest } from '../../dto/friendRequest/IUpdateFriendRequest';
import { ApplicationErrors } from '../../errors';
import { IPeopleRepository } from '../../repositories/interfaces/IPeopleRepository';

export class RemovePeopleFriendService {
  peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async execute(removeFriendParams: IUpdateFriendRequest): Promise<void> {
    const peopleRepository = getCustomRepository(
      this.peopleRepository as unknown as ObjectType<IPeopleRepository>
    );

    const people = await peopleRepository.findById(removeFriendParams.peopleId);

    if (!people) throw new ApplicationErrors('Usuário não existe', 404);

    await peopleRepository.removeFriend(removeFriendParams);
  }
}
