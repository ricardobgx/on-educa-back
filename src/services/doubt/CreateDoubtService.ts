import { getCustomRepository, ObjectType } from 'typeorm';
import { IDoubtRequest } from '../../dto/doubt/IDoubtRequest';
import { Doubt } from '../../entities/Doubt';
import { IDoubtRepository } from '../../repositories/interfaces/IDoubtRepository';

export class CreateDoubtService {
  doubtRepository: IDoubtRepository;

  constructor(doubtRepository: IDoubtRepository) {
    this.doubtRepository = doubtRepository;
  }

  async execute(doubtParams: IDoubtRequest): Promise<Doubt> {
    const doubtRepository = getCustomRepository(
      this.doubtRepository as unknown as ObjectType<IDoubtRepository>
    );

    const doubt = await doubtRepository.createDoubt(doubtParams);

    return doubt;
  }
}
