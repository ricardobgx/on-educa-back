import { getCustomRepository, ObjectType } from 'typeorm';
import { IMissionProgressSearchParams } from '../../dto/missionProgress/IMissionProgressSearchParams';
import MissionProgress from '../../entities/MissionProgress';
import { IMissionProgressRepository } from '../../repositories/interfaces/mission/IMissionProgressRepository';

export class ListMissionProgressService {
  missionProgressRepository: IMissionProgressRepository;

  constructor(missionProgressRepository: IMissionProgressRepository) {
    this.missionProgressRepository = missionProgressRepository;
  }

  async execute(
    searchParams: IMissionProgressSearchParams
  ): Promise<MissionProgress[]> {
    const missionProgressRepository = getCustomRepository(
      this
        .missionProgressRepository as unknown as ObjectType<IMissionProgressRepository>
    );

    const units = missionProgressRepository.findAll(searchParams);

    return units;
  }
}
