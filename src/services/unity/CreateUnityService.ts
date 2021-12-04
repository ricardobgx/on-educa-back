import { getCustomRepository, ObjectType } from "typeorm";
import { IUnityRequest } from "../../dto/IUnityRequest";
import { Unity } from "../../entities/Unity";
import { IUnityRepository } from "../../repositories/interfaces/IUnityRepository";

export class CreateUnityService {
  unityRepository: IUnityRepository;

  constructor(unityRepository: IUnityRepository) {
    this.unityRepository = unityRepository;
  }

  async execute(unityParams: IUnityRequest): Promise<Unity> {
    const unityRepository = getCustomRepository(this.unityRepository as unknown as ObjectType<IUnityRepository>);

    const unity = unityRepository.createUnity(unityParams);

    return unity;
  }
}