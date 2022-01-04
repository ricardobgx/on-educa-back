import { getCustomRepository, ObjectType } from 'typeorm';
import { IAlternativeRequest } from '../../dto/IAlternativeRequest';
import { Alternative } from '../../entities/Alternative';
import { IAlternativeRepository } from '../../repositories/interfaces/IAlternativeRepository';

export class CreateAlternativeService {
  alternativeRepository: IAlternativeRepository;

  constructor(alternativeRepository: IAlternativeRepository) {
    this.alternativeRepository = alternativeRepository;
  }

  async execute(alternativeParams: IAlternativeRequest): Promise<Alternative> {
    const alternativeRepository = getCustomRepository(
      this
        .alternativeRepository as unknown as ObjectType<IAlternativeRepository>
    );

    const alternative = await alternativeRepository.createAlternative(
      alternativeParams
    );

    return alternative;
  }
}
