import { getCustomRepository, ObjectType } from "typeorm";
import { Unity } from "../../entities/Unity";
import { IUnityRepository } from "../../repositories/interfaces/IUnityRepository";

export class ListUnityService {
  unityRepository: IUnityRepository;

  constructor(unityRepository: IUnityRepository) {
    this.unityRepository = unityRepository;
  }

  async execute(): Promise<Unity[]> {
    const unityRepository = getCustomRepository(this.unityRepository as unknown as ObjectType<IUnityRepository>);

    const units = unityRepository.findAll();

    return units;
  }
}