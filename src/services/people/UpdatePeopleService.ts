import { hash } from 'bcryptjs';
import { getCustomRepository, ObjectType } from 'typeorm';
import { IPeopleRequest } from '../../dto/people/IPeopleRequest';
import { ApplicationErrors } from '../../errors';
import { IPeopleRepository } from '../../repositories/interfaces/IPeopleRepository';

export class UpdatePeopleService {
  peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async execute(peopleParams: IPeopleRequest): Promise<void> {
    const peopleRepository = getCustomRepository(
      this.peopleRepository as unknown as ObjectType<IPeopleRepository>
    );

    const people = await peopleRepository.findById(peopleParams.id);

    if (!people) throw new ApplicationErrors('Usuário não existe', 404);

    if (peopleParams.password) {
      peopleParams.password = await hash(peopleParams.password, 8);
    }

    await peopleRepository.updateById(peopleParams);
  }
}
