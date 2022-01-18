import { getCustomRepository, ObjectType } from 'typeorm';
import { Practice } from '../../entities/Practice';
import { IPracticeRepository } from '../../repositories/interfaces/IPracticeRepository';

export class ListPracticeService {
  practiceRepository: IPracticeRepository;

  constructor(practiceRepository: IPracticeRepository) {
    this.practiceRepository = practiceRepository;
  }

  async execute(): Promise<Practice[]> {
    const practiceRepository = getCustomRepository(
      this.practiceRepository as unknown as ObjectType<IPracticeRepository>
    );

    const practices = await practiceRepository.findAll();

    return practices;
  }
}
