import { getCustomRepository, ObjectType } from 'typeorm';
import { IPracticeRequest } from '../../dto/IPracticeRequest';
import { Practice } from '../../entities/Practice';
import { IPracticeRepository } from '../../repositories/interfaces/IPracticeRepository';

export class CreatePracticeService {
  practiceRepository: IPracticeRepository;

  constructor(practiceRepository: IPracticeRepository) {
    this.practiceRepository = practiceRepository;
  }

  async execute(practiceParams: IPracticeRequest): Promise<Practice> {
    const practiceRepository = getCustomRepository(
      this.practiceRepository as unknown as ObjectType<IPracticeRepository>
    );

    const practice = await practiceRepository.createPractice(practiceParams);

    return practice;
  }
}
