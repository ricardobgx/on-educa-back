import { getCustomRepository, ObjectType } from 'typeorm';
import { Alternative } from '../../entities/Alternative';
import { IAlternativeRepository } from '../../repositories/interfaces/IAlternativeRepository';

export class ListAlternativesService {
  alternativeRepository: IAlternativeRepository;

  constructor(alternativeRepository: IAlternativeRepository) {
    this.alternativeRepository = alternativeRepository;
  }

  async execute(): Promise<Alternative[]> {
    const alternativeRepository = getCustomRepository(
      this
        .alternativeRepository as unknown as ObjectType<IAlternativeRepository>
    );

    const alternatives = await alternativeRepository.findAll();

    return alternatives;
  }
}
