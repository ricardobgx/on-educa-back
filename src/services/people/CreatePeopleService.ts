import { hash } from 'bcryptjs';
import { getCustomRepository, ObjectType } from 'typeorm';
import { IPeopleRequest } from '../../dto/IPeopleRequest';
import { People } from '../../entities/People';
import { ApplicationErrors } from '../../errors';
import { IPeopleRepository } from '../../repositories/interfaces/IPeopleRepository';

export class CreatePeopleService {
  peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async execute(peopleParams: IPeopleRequest): Promise<People> {
    const peopleRepository = getCustomRepository(
      this.peopleRepository as unknown as ObjectType<IPeopleRepository>
    );

    const peopleExists = await peopleRepository.findByEmail(peopleParams.email);

    if (peopleExists) throw new ApplicationErrors('Usuário já existe!', 400);

    peopleParams.password = await hash(peopleParams.password, 8);

    const people = await peopleRepository.createPeople({ ...peopleParams });

    return people;
  }
}
