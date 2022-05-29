import { getCustomRepository, ObjectType } from 'typeorm';
import { IMissionProgressRequest } from '../../dto/missionProgress/IMissionProgressRequest';
import { IMissionProgressRepository } from '../../repositories/interfaces/mission/IMissionProgressRepository';

export class UpdateMissionProgressService {
  missionProgressRepository: IMissionProgressRepository;

  constructor(missionProgressRepository: IMissionProgressRepository) {
    this.missionProgressRepository = missionProgressRepository;
  }

  async execute(missionProgressParams: IMissionProgressRequest): Promise<void> {
    const missionProgressRepository = getCustomRepository(
      this
        .missionProgressRepository as unknown as ObjectType<IMissionProgressRepository>
    );

    await missionProgressRepository.updateById(missionProgressParams);
  }
}
