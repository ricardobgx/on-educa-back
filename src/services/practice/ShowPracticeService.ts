import { getCustomRepository, ObjectType } from 'typeorm';
import { Practice } from '../../entities/Practice';
import { ApplicationErrors } from '../../errors';
import { IPracticeRepository } from '../../repositories/interfaces/IPracticeRepository';

export class ShowPracticeService {
  practiceRepository: IPracticeRepository;

  constructor(practiceRepository: IPracticeRepository) {
    this.practiceRepository = practiceRepository;
  }

  async execute(id: string): Promise<Practice> {
    const practiceRepository = getCustomRepository(
      this.practiceRepository as unknown as ObjectType<IPracticeRepository>
    );

    const practice = await practiceRepository.findById(id);

    if (!practice) throw new ApplicationErrors('Entidade não existe', 404);

    return practice;
  }
}
