import { getCustomRepository, ObjectType } from 'typeorm';
import { IAlternativeRequest } from '../../dto/alternative/IAlternativeRequest';
import { ApplicationErrors } from '../../errors';
import { IAlternativeRepository } from '../../repositories/interfaces/IAlternativeRepository';

export class UpdateAlternativeService {
  alternativeRepository: IAlternativeRepository;

  constructor(alternativeRepository: IAlternativeRepository) {
    this.alternativeRepository = alternativeRepository;
  }

  async execute(alternativeParams: IAlternativeRequest): Promise<void> {
    const alternativeRepository = getCustomRepository(
      this
        .alternativeRepository as unknown as ObjectType<IAlternativeRepository>
    );

    const Alternative = await alternativeRepository.findById(
      alternativeParams.id
    );

    if (!Alternative) throw new ApplicationErrors('Disciplina não existe', 404);

    await alternativeRepository.updateById(alternativeParams);
  }
}
