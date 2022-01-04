import { getCustomRepository, ObjectType } from 'typeorm';
import { IManyAlternatives } from '../../dto/IManyAlternatives';
import { Alternative } from '../../entities/Alternative';
import { IAlternativeRepository } from '../../repositories/interfaces/IAlternativeRepository';

export class CreateManyAlternativesService {
  alternativeRepository: IAlternativeRepository;

  constructor(alternativeRepository: IAlternativeRepository) {
    this.alternativeRepository = alternativeRepository;
  }

  async execute(alternativesParams: IManyAlternatives): Promise<Alternative[]> {
    const alternativeRepository = getCustomRepository(
      this
        .alternativeRepository as unknown as ObjectType<IAlternativeRepository>
    );

    const alternatives = await alternativeRepository.createManyAlternatives(
      alternativesParams
    );

    return alternatives;
  }
}
