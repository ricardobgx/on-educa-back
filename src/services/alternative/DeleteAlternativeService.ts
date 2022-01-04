import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IAlternativeRepository } from '../../repositories/interfaces/IAlternativeRepository';

export class DeleteAlternativeService {
  alternativeRepository: IAlternativeRepository;

  constructor(alternativeRepository: IAlternativeRepository) {
    this.alternativeRepository = alternativeRepository;
  }

  async execute(id: string): Promise<void> {
    const alternativeRepository = getCustomRepository(
      this
        .alternativeRepository as unknown as ObjectType<IAlternativeRepository>
    );

    const alternative = await alternativeRepository.findById(id);

    if (!alternative)
      throw new ApplicationErrors('Alternativa não existe!', 404);

    await alternativeRepository.deleteById(id);
  }
}
