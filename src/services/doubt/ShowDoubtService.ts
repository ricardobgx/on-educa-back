import { getCustomRepository, ObjectType } from 'typeorm';
import { Doubt } from '../../entities/Doubt';
import { ApplicationErrors } from '../../errors';
import { IDoubtRepository } from '../../repositories/interfaces/IDoubtRepository';

export class ShowDoubtService {
  doubtRepository: IDoubtRepository;

  constructor(doubtRepository: IDoubtRepository) {
    this.doubtRepository = doubtRepository;
  }

  async execute(id: string): Promise<Doubt> {
    const doubtRepository = getCustomRepository(
      this.doubtRepository as unknown as ObjectType<IDoubtRepository>
    );

    const doubt = await doubtRepository.findById(id);

    if (!doubt) throw new ApplicationErrors('Entidade não existe', 404);

    return doubt;
  }
}
