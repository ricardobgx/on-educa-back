import { getCustomRepository, ObjectType } from 'typeorm';
import { IUnityRepository } from '../../repositories/interfaces/IUnityRepository';

export class DeleteUnityService {
  unityRepository: IUnityRepository;

  constructor(unityRepository: IUnityRepository) {
    this.unityRepository = unityRepository;
  }

  async execute(id: string): Promise<void> {
    const unityRepository = getCustomRepository(
      this.unityRepository as unknown as ObjectType<IUnityRepository>
    );

    await unityRepository.deleteById(id);
  }
}
