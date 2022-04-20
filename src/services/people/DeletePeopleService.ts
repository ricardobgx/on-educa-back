import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IPeopleRepository } from '../../repositories/interfaces/IPeopleRepository';

export class DeletePeopleService {
  userRepository: IPeopleRepository;

  constructor(userRepository: IPeopleRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string): Promise<void> {
    const userRepository = getCustomRepository(
      this.userRepository as unknown as ObjectType<IPeopleRepository>
    );

    const user = await userRepository.findById(id);

    if (!user) throw new ApplicationErrors('Usuário não existe!', 404);

    await userRepository.deleteById(id);
  }
}
