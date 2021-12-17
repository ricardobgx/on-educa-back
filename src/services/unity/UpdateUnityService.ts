import { getCustomRepository, ObjectType } from 'typeorm';
import { IUnityRequest } from '../../dto/IUnityRequest';
import { IUnityRepository } from '../../repositories/interfaces/IUnityRepository';

export class UpdateUnityService {
  unityRepository: IUnityRepository;

  constructor(unityRepository: IUnityRepository) {
    this.unityRepository = unityRepository;
  }

  async execute(unityParams: IUnityRequest): Promise<void> {
    const unityRepository = getCustomRepository(
      this.unityRepository as unknown as ObjectType<IUnityRepository>
    );

    await unityRepository.updateById(unityParams);
  }
}
