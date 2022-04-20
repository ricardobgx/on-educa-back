import { getCustomRepository, ObjectType } from 'typeorm';
import { IDoubtRequest } from '../../dto/doubt/IDoubtRequest';
import { ApplicationErrors } from '../../errors';
import { IDoubtRepository } from '../../repositories/interfaces/IDoubtRepository';

export class UpdateDoubtService {
  doubtRepository: IDoubtRepository;

  constructor(doubtRepository: IDoubtRepository) {
    this.doubtRepository = doubtRepository;
  }

  async execute(doubtParams: IDoubtRequest): Promise<void> {
    const doubtRepository = getCustomRepository(
      this.doubtRepository as unknown as ObjectType<IDoubtRepository>
    );

    const doubt = await doubtRepository.findById(doubtParams.id);

    if (!doubt) throw new ApplicationErrors('Entidade não existe', 404);

    await doubtRepository.updateById(doubtParams);
  }
}
