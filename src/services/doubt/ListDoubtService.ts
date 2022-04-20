import { getCustomRepository, ObjectType } from 'typeorm';
import { Doubt } from '../../entities/Doubt';
import { IDoubtRepository } from '../../repositories/interfaces/IDoubtRepository';

export class ListDoubtService {
  doubtRepository: IDoubtRepository;

  constructor(doubtRepository: IDoubtRepository) {
    this.doubtRepository = doubtRepository;
  }

  async execute(): Promise<Doubt[]> {
    const doubtRepository = getCustomRepository(
      this.doubtRepository as unknown as ObjectType<IDoubtRepository>
    );

    const doubts = await doubtRepository.findAll();

    return doubts;
  }
}
