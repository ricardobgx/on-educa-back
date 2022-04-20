import { getCustomRepository, ObjectType } from 'typeorm';
import { Doubt } from '../../entities/Doubt';
import { IDoubtRepository } from '../../repositories/interfaces/IDoubtRepository';

export class ListDoubtByContentService {
  unityRepository: IDoubtRepository;

  constructor(unityRepository: IDoubtRepository) {
    this.unityRepository = unityRepository;
  }

  async execute(contentId): Promise<Doubt[]> {
    const unityRepository = getCustomRepository(
      this.unityRepository as unknown as ObjectType<IDoubtRepository>
    );

    const units = unityRepository.findByContent(contentId);

    return units;
  }
}
