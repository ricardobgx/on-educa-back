import { getCustomRepository, ObjectType } from 'typeorm';
import { Alternative } from '../../entities/Alternative';
import { ApplicationErrors } from '../../errors';
import { IAlternativeRepository } from '../../repositories/interfaces/IAlternativeRepository';

export class ShowAlternativeService {
  alternativeRepository: IAlternativeRepository;

  constructor(alternativeRepository: IAlternativeRepository) {
    this.alternativeRepository = alternativeRepository;
  }

  async execute(id: string): Promise<Alternative> {
    const alternativeRepository = getCustomRepository(
      this
        .alternativeRepository as unknown as ObjectType<IAlternativeRepository>
    );

    const alternative = await alternativeRepository.findById(id);

    if (!alternative)
      throw new ApplicationErrors('Alternativa não existe', 404);

    return alternative;
  }
}
