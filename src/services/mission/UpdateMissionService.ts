import { getCustomRepository, ObjectType } from 'typeorm';
import { IMissionRequest } from '../../dto/mission/IMissionRequest';
import { IMissionRepository } from '../../repositories/interfaces/mission/IMissionRepository';

export class UpdateMissionService {
  missionRepository: IMissionRepository;

  constructor(missionRepository: IMissionRepository) {
    this.missionRepository = missionRepository;
  }

  async execute(missionParams: IMissionRequest): Promise<void> {
    const missionRepository = getCustomRepository(
      this.missionRepository as unknown as ObjectType<IMissionRepository>
    );

    await missionRepository.updateById(missionParams);
  }
}
