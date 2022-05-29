import { getCustomRepository, ObjectType } from 'typeorm';
import Mission from '../../entities/Mission';
import { IMissionRepository } from '../../repositories/interfaces/mission/IMissionRepository';

export class ListMissionService {
  missionRepository: IMissionRepository;

  constructor(missionRepository: IMissionRepository) {
    this.missionRepository = missionRepository;
  }

  async execute(): Promise<Mission[]> {
    const missionRepository = getCustomRepository(
      this.missionRepository as unknown as ObjectType<IMissionRepository>
    );

    const units = missionRepository.findAll();

    return units;
  }
}
