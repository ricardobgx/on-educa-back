import { getCustomRepository, ObjectType } from 'typeorm';
import { IMissionProgressRequest } from '../../dto/missionProgress/IMissionProgressRequest';
import MissionProgress from '../../entities/MissionProgress';
import { IMissionProgressRepository } from '../../repositories/interfaces/mission/IMissionProgressRepository';

export class CreateMissionProgressService {
  missionProgressRepository: IMissionProgressRepository;

  constructor(missionProgressRepository: IMissionProgressRepository) {
    this.missionProgressRepository = missionProgressRepository;
  }

  async execute(
    missionProgressParams: IMissionProgressRequest
  ): Promise<MissionProgress> {
    const missionProgressRepository = getCustomRepository(
      this
        .missionProgressRepository as unknown as ObjectType<IMissionProgressRepository>
    );

    const missionProgress = missionProgressRepository.createMissionProgress(
      missionProgressParams
    );

    return missionProgress;
  }
}
