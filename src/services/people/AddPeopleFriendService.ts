import { getCustomRepository, ObjectType } from 'typeorm';
import { IUpdateFriendRequest } from '../../dto/IUpdateFriendRequest';
import { ApplicationErrors } from '../../errors';
import { IPeopleRepository } from '../../repositories/interfaces/IPeopleRepository';

export class AddPeopleFriendService {
  peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async execute(addFriendParams: IUpdateFriendRequest): Promise<void> {
    const peopleRepository = getCustomRepository(
      this.peopleRepository as unknown as ObjectType<IPeopleRepository>
    );

    const people = await peopleRepository.findById(addFriendParams.peopleId);

    if (!people) throw new ApplicationErrors('Usuário não existe', 404);

    await peopleRepository.addFriend(addFriendParams);
  }
}
