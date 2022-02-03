import { getCustomRepository, ObjectType } from 'typeorm';
import { People } from '../../entities/People';
import { ApplicationErrors } from '../../errors';
import { IPeopleRepository } from '../../repositories/interfaces/IPeopleRepository';

export class ShowPeopleService {
  peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async execute(id: string): Promise<People> {
    const peopleRepository = getCustomRepository(
      this.peopleRepository as unknown as ObjectType<IPeopleRepository>
    );

    const people = await peopleRepository.findById(id);

    if (!people) throw new ApplicationErrors('Pessoa não existe', 404);

    return people;
  }
}
