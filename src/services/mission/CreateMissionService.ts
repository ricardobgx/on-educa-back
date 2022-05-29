import { getCustomRepository, ObjectType } from 'typeorm';
import { IMissionRequest } from '../../dto/mission/IMissionRequest';
import Mission from '../../entities/Mission';
import { IMissionRepository } from '../../repositories/interfaces/mission/IMissionRepository';

export class CreateMissionService {
  missionRepository: IMissionRepository;

  constructor(missionRepository: IMissionRepository) {
    this.missionRepository = missionRepository;
  }

  async execute(missionParams: IMissionRequest): Promise<Mission> {
    const missionRepository = getCustomRepository(
      this.missionRepository as unknown as ObjectType<IMissionRepository>
    );

    const mission = missionRepository.createMission(missionParams);

    return mission;
  }
}
