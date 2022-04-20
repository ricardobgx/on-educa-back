import { getCustomRepository, ObjectType } from 'typeorm';
import { People } from '../../entities/People';
import { IPeopleRepository } from '../../repositories/interfaces/IPeopleRepository';

export class ListPeopleService {
  peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async execute(): Promise<People[]> {
    const peopleRepository = getCustomRepository(
      this.peopleRepository as unknown as ObjectType<IPeopleRepository>
    );

    const peoples = await peopleRepository.findAll();

    return peoples;
  }
}
